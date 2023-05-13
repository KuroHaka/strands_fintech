import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemUnitComponent } from './item-unit/item-unit.component';
import { UserDraggableComponent } from './user-draggable/user-draggable.component';


import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDraggableComponent,
    ItemUnitComponent,
    UserListComponent,
    ItemListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
