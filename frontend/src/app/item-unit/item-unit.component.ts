import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-item-unit',
    templateUrl: './item-unit.component.html',
    styleUrls: ['./item-unit.component.scss']
})
export class ItemUnitComponent {
    @Input() productName: string = ""
    @Input() price: string = ""
    @Input() currency: string = ""
    @Input() users: string = ""
    @Input() units: string = ""
}

export interface Product {
    productName: string;
    price: number;
    currency: string;
    users: string[];
    units: number;
}