import { Component, OnInit } from '@angular/core';
import { ItemUnitComponent } from './item-unit/item-unit.component';
import { Product } from './item-unit/item-unit.component';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'frontend';
    items: Product[] = [];

    ngOnInit(): void {
        this.items = [
            { productName: "Cocacola", price: 2, currency: "€", users: [], units: 0 }
        ]
    }
}
