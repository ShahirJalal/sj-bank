import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  accountNumber: string = '';
  balance: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.userService.getUserById(parseInt(userId)).subscribe(
        user => {
          this.accountNumber = user.accountNumber;
          this.balance = user.initialBalance;
        },
        error => {
          console.error('Error retrieving user details', error);
        }
      );
    }
  }
}
