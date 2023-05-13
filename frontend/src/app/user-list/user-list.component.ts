import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { User } from '../user-draggable/user-draggable.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  users: User[] = []; 
  
  constructor(private backend : BackendService)
  {}

  ngOnInit(): void {

      this.backend.get("test").subscribe((data: any) => {
          this.users = [
              { name: "Joan", contribution: data.totalElements }
          ];

          console.log(data);
      })
  }
}
