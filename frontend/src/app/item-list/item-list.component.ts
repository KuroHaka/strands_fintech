import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { BackendService } from '../backend.service';
import { Product } from '../item-unit/item-unit.component';
import { User } from '../user-draggable/user-draggable.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpHeaders } from '@angular/common/http';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
    constructor(private backend: BackendService) { }
    users: Record<string, User> = {};
    items: Product[] = [];
    selected: string[] = [];
    currentFilter: string = "";
    filteredOptions: Observable<string[]> | undefined;
    options: any[] = [];
    myControl = new FormControl<string>('');
    allChecked: boolean = true;
    goodMessage: boolean = false;
    cashout: string = "";

    @Output() setPriceEvent = new EventEmitter<number>();

    ngOnInit() {

        this.users = {};
        this.items = [];

        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(name => {
                return name ? this._filter(name as string) : this.options.slice();
            }),
        );

        this.backend.post("group/get", {
            "req": {
                "group_id": "0"
            }
        }, new HttpHeaders({
            'Content-Type': 'application/json'
        })).subscribe((data: any) => {
            var total = 0;

            if (Object.keys(data.group).length == 0) return;

            for (var i = 0; i < data.group.users.length; i++) {
                var user = data.group.users[i];

                this.users[user.id] = {
                    name: user.name,
                    firstSurname: user.firstSurname,
                    secondSurname: user.secondSurname,
                    id: user.id,
                    contribution: 0,
                }
            }

            for (var i = 0; i < data.group.products.length; i++) {
                var product = data.group.products[i];
                total += product.price;
                this.items.push({
                    productName: product.product_name,
                    price: product.price,
                    currency: product.currency,
                    users: new Set(product.users),
                    units: product.units,
                    id: i,
                });
            }

            this.cashout = "Cashout: " + total + "$";

        })


        this.backend.post("users/get_all", {
        }, new HttpHeaders({
            'Content-Type': 'application/json'
        })).subscribe((data: any) => {
            this.options = [];
            for (var i = 0; i < data.users.length; i++) {
                this.options.push({
                    "name": data.users[i].name + " " + data.users[i].firstSurname,
                    "id": data.users[i].id
                });
            }
        });
    }

    setInvite(event: string) {
        var data = JSON.parse(event);

        this.backend.post("group/users/add", {
            "req": {
                "group_id": "0",
                "user_id": data.id
            }
        }, new HttpHeaders({
            'Content-Type': 'application/json'
        })).subscribe((data: any) => {
            this.users = {};

            for (var i = 0; i < data.group.users.length; i++) {
                var user = data.group.users[i];
                this.users[user.id] = {
                    name: user.name,
                    firstSurname: user.firstSurname,
                    secondSurname: user.secondSurname,
                    id: user.id,
                    contribution: 0
                }
            }
        });
    }

    private _filter(name: string): string[] {
        const filterValue = name.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    drop(event: CdkDragDrop<User[]>) {
        var userID = this.users[event.item.element.nativeElement.id].id
        var productID = parseInt(event.container.element.nativeElement.id);
        this.items[productID].users.add(userID);
        //update butget and prices
        this.update_all_prices()
    }


    update_all_prices() {
        var f = 0;
        for (let user in this.users) {
            this.users[user].contribution = 0
        }
        for (var i in this.items) {

            if (this.items[i].users.size != 0) {
                var price_person = this.items[i].price / this.items[i].users.size
                price_person = Math.round(price_person * 100 + Number.EPSILON) / 100
            }
            else{
                var price_person = 0
                f += 1;
            }
            for (var user of Array.from(this.items[i].users.values())) {
                this.users[user].contribution += price_person
                console.log(this.users[user].contribution)
            }
        }

        console.log(f);
        if(f == 0){
            this.allChecked = false;
        } else {
            this.allChecked = true;
        }
    }

    upload(){


        var contributions = [];
        for (const key in this.users) {
            contributions.push({
                "user_id": this.users[key].id,
                "contribution": this.users[key].contribution
            });
        }

        this.backend.post("group/pay", {
            "req": {
                "group_id": "0",
                "total": contributions
            }
        }, new HttpHeaders({
            'Content-Type': 'application/json'
        })).subscribe((data: any) => {
            
            this.goodMessage = true;
        });

    }
}