import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-item-unit',
    templateUrl: './item-unit.component.html',
    styleUrls: ['./item-unit.component.scss']
})
export class ItemUnitComponent {
    @Input() productName: string = ""
    @Input() price: number = 0
    @Input() currency: string = ""
    @Input() users: string[] = []
    @Input() units: number = 0
}

export interface Product {
    productName: string;
    price: number;
    currency: string;
    users: [];
    units: number;
}