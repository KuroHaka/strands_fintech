import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  constructor(private backend: BackendService) { }

  transactions: any[] = [];

  ngOnInit() {
    this.backend.post("users/get_transactions", {
      "login": {
        "username": "userPFM11"
      }
    }, new HttpHeaders({
      'Content-Type': 'application/json'
    })).subscribe((data: any) => {
      this.transactions = data.transactions;
      console.log(data);
    })
  }
}
