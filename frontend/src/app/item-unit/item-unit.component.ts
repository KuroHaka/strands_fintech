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
    @Input() units: string = ""
    @Input() id: string = ""
    @Input() users: Set<string> = new Set();

    remove(user: string): void {
        this.users.delete(user);
    }
}

export interface Product {
    productName: string;
    price: number;
    currency: string;
    users: Set<string>;
    units: number;
}