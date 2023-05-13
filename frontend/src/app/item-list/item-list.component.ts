import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { Product } from '../item-unit/item-unit.component';
import { User } from '../user-draggable/user-draggable.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  constructor(private backend : BackendService)
  {}
  users: User[] = [];
  items: Product[] = [];
  options: string[] = [];

  ngOnInit(): void {
      
    /*
    this.users = [
        
        {name: "Joan", contribution: 0},
        {name: "Danilo", contribution: 0},
        {name: "Pere", contribution: 0},
      ];
    */

      this.backend.post("group/get", {
        "req": {
          "group_id": "0"
        }
      }, new HttpHeaders({
        'Content-Type':  'application/json'
      })).subscribe((data: any) => {

        this.users = []
        this.options = []

        for(var i = 0; i < data.group.users.length; i++){
          var user = data.group.users[i];
          console.log(user);
          this.users.push({
            name: user,
            contribution: 0,
          });
        }

        this.items = [];

        for(var i = 0; i < data.group.products.length; i++){
          var product = data.group.products[i];
          this.items.push({
            productName: product.product_name,
            price: product.price, 
            currency: "€",
            users: new Set(product.users), 
            units: product.units,
            id: product.id,
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

  drop(event: CdkDragDrop<User[]>) {
    var userName = event.item.element.nativeElement.id
    var productID = event.container.element.nativeElement.id;

    this.items[parseInt(productID)].users.add(userName);
  }
}
