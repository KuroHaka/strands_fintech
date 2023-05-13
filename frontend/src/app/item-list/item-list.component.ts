import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { Product } from '../item-unit/item-unit.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  constructor(private backend : BackendService)
  {}

  items: Product[] = [];

  ngOnInit(): void {

      this.items = [
          { productName: "Cocacola", price: 2, currency: "€", users: [], units: 2 },
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

      
  }
}
