import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-draggable',
  templateUrl: './user-draggable.component.html',
  styleUrls: ['./user-draggable.component.scss']
})
export class UserDraggableComponent {
  @Input() name: string = "";
  @Input() contribution: string = "";
}

export interface User {
  name: string;
  firstSurname: string;
  secondSurname: string;
  contribution: number;
  id: string;
}