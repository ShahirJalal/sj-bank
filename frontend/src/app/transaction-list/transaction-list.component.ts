import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  username: string | null = '';

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    if (this.username) {
      this.transactionService.getTransactionsByUsername(this.username).subscribe(
        (data: Transaction[]) => {
          this.transactions = data.map(transaction => {
            if (transaction.recipient === this.username && transaction.transactionType === 'transfer') {
              return { ...transaction, transactionType: 'receive' };
            }
            return transaction;
          });
        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
    }
  }
}
