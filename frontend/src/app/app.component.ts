import { Component, OnInit } from '@angular/core';
import { ItemUnitComponent } from './item-unit/item-unit.component';
import { Product } from './item-unit/item-unit.component';
import { User } from './user-draggable/user-draggable.component';
import { UserDraggableComponent } from './user-draggable/user-draggable.component';
import { HttpClient } from '@angular/common/http';
import { BackendService } from './backend.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
    title = 'frontend';

    constructor(private backend : BackendService)
    {}

    ngOnInit(): void {
        
    }
}
