import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

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
    chips = ['pedro', 'javi', 'luffy', 'miau', 'guau', 'joan', 'roca']

    remove(user: string): void {
        this.chips = this.chips.filter(item => item !== user);
    }
}

export interface Product {
    productName: string;
    price: number;
    currency: string;
    users: string[];
    units: number;
}