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
  currentFilter: string = "";
  filteredOptions: Observable<string[]> | undefined;
  options: any[] = [];
  myControl = new FormControl<string>('');

  ngOnInit() {
    this.RefreshView();
  }


  RefreshView(){

    this.users = [];
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

      
      if(Object.keys(data.group).length == 0) return;

      for (var i = 0; i < data.group.users.length; i++) {
        var user = data.group.users[i];
        
        this.users.push({
          name: user.name,
          firstSurname: user.firstSurname,
          secondSurname: user.secondSurname,
          id: user.id,
          contribution: 0,
        });
      }

      for (var i = 0; i < data.group.products.length; i++) {
        var product = data.group.products[i];
        console.log(product.currency);
        this.items.push({
          productName: product.product_name,
          price: product.price,
          currency: product.currency,
          users: new Set(product.users),
          units: product.units,
          id: i,
        });
      }

      console.log(data);
    })


    this.backend.post("users/get_all", {
    }, new HttpHeaders({
      'Content-Type': 'application/json'
    })).subscribe((data: any) => {
      console.log("Allusers")
      console.log(data);

      this.options = [];
      for(var i = 0; i < data.users.length; i++){
        this.options.push({
          "name": data.users[i].name + " " + data.users[i].firstSurname + " " + data.users[i].secondSurname,
          "id": data.users[i].id
        });
      }

      console.log(this.options);
    });
  }

  setInvite(event: string){
    console.log("HOLA")
    console.log(event);
    var data = JSON.parse(event);
    console.log("dataoption:",data.id.toString());

    this.backend.post("group/users/add", {
      "req": {
        "group_id": "0",
        "user_id": data.id
      }
    }, new HttpHeaders({
      'Content-Type': 'application/json'
    })).subscribe((data: any) => {
      this.users = [];

      for (var i = 0; i < data.group.users.length; i++) {
        var user = data.group.users[i];
        
        this.users.push({
          name: user.name,
          firstSurname: user.firstSurname,
          secondSurname: user.secondSurname,
          id: user.id,
          contribution: 0,
        });
      }
    });
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  drop(event: CdkDragDrop<User[]>) {
    var userID = event.item.element.nativeElement.id
    console.log(userID)
    var productID = event.container.element.nativeElement.id;
    console.log(productID)

    this.items[parseInt(productID)].users.add(userID);
  }
}
