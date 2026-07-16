import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { TransactionService } from '../services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositForm: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private transactionService: TransactionService,
    private router: Router
  ) {
    this.depositForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe(
        user => {
          this.user = user;
        },
        error => {
          console.error('Error fetching user data:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.depositForm.valid && this.user) {
      const depositAmount = this.depositForm.value.amount;
      this.user.initialBalance += depositAmount;
      this.userService.updateUser(this.user.id, this.user).subscribe(
        response => {
          console.log('User balance updated successfully');
          const transaction = {
            transactionType: 'deposit',
            amount: depositAmount,
            recipientAccountNumber: '',
            senderAccountNumber: this.user.accountNumber,
            reference: 'Deposit',
            sender: this.user.username,
            recipient: ''
          };
          this.transactionService.createTransaction(transaction).subscribe(
            () => {
              console.log('Transaction created for deposit');
              this.router.navigate(['/dashboard']);
            },
            error => {
              console.error('Error creating transaction for deposit:', error);
            }
          );
        },
        error => {
          console.error('Error updating user balance', error);
        }
      );
    }
  }
}
