import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { Product } from '../item-unit/item-unit.component';
import { User } from '../user-draggable/user-draggable.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  constructor(private backend: BackendService) { }
  users: User[] = [];
  items: Product[] = [];
  selected: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  options: string[] = ['Mary', 'Shelley', 'Igor'];
  myControl = new FormControl<string>('');

  ngOnInit() {

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

      this.users = []
      this.options = ["pepe", "papa", "product", "Minerva McGonagall"]
      for (var i = 0; i < data.group.users.length; i++) {
        var user = data.group.users[i];
        this.users.push({
          name: user,
          contribution: 0,
        });
      }

      this.items = [];

      for (var i = 0; i < data.group.products.length; i++) {
        var product = data.group.products[i];
        this.items.push({
          productName: product.product_name,
          price: product.price,
          currency: product.currency,
          users: new Set(product.users),
          units: product.units,
        });
      }

      console.log(data);
    })
    /*
    this.items = [
        { productName: "Cocacola", price: 2, currency: "€", users: [pableo], units: 2 },
        { productName: "Fanta", price: 2, currency: "€", users: [], units: 3 },
        { productName: "Bistec", price: 7, currency: "€", users: [], units: 1 },
        { productName: "Nissin", price: 2, currency: "€", users: [], units: 1 },
  
        { productName: "Cocadsacola", price: 2, currency: "€", users: [], units: 2 },
        { productName: "Fantdasa", price: 2, currency: "€", users: [], units: 3 },
        { productName: "Bistdasdsaec", price: 7, currency: "€", users: [], units: 1 },
        { productName: "Nisdsadassin", price: 2, currency: "€", users: [], units: 1 },
        { productName: "Cocadsacola", price: 2, currency: "€", users: [], units: 2 },
        { productName: "Fantdasa", price: 2, currency: "€", users: [], units: 3 },
        { productName: "Bistdasdsaec", price: 7, currency: "€", users: [], units: 1 },
        { productName: "Nisdsadassin", price: 2, currency: "€", users: [], units: 1 }
    ]
    */

  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  drop(event: CdkDragDrop<User[]>) {
    var userName = event.item.element.nativeElement.id
    var productID = event.container.element.nativeElement.id;

    this.items[parseInt(productID)].users.add(userName);
  }
}
