import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { TransactionService } from '../services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  withdrawForm: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private transactionService: TransactionService,
    private router: Router
  ) {
    this.withdrawForm = this.fb.group({
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
    if (this.withdrawForm.valid && this.user) {
      const withdrawAmount = this.withdrawForm.value.amount;
      if (withdrawAmount > this.user.initialBalance) {
        this.withdrawForm.get('amount')!.setErrors({ insufficientFunds: true });
        return;
      }
      this.user.initialBalance -= withdrawAmount;
      this.userService.updateUser(this.user.id, this.user).subscribe(
        response => {
          console.log('User balance updated successfully');
          const transaction = {
            transactionType: 'withdraw',
            amount: withdrawAmount,
            recipientAccountNumber: '',
            senderAccountNumber: this.user.accountNumber,
            reference: 'Withdrawal',
            sender: this.user.username,
            recipient: ''
          };
          this.transactionService.createTransaction(transaction).subscribe(
            () => {
              console.log('Transaction created for withdrawal');
              this.router.navigate(['/dashboard']);
            },
            error => {
              console.error('Error creating transaction for withdrawal:', error);
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
