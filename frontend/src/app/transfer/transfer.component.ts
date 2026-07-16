import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TransactionService } from '../services/transaction.service';
import { User } from '../models/user.model';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;
  sender: User | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private transactionService: TransactionService,
    private router: Router
  ) {
    this.transferForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      recipientAccountNumber: ['', Validators.required],
      reference: ['']
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe(
        user => {
          this.sender = user;
        },
        error => {
          console.error('Error fetching sender user data', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.transferForm.valid && this.sender) {
      const amount = this.transferForm.value.amount;
      const recipientAccountNumber = this.transferForm.value.recipientAccountNumber;
      const reference = this.transferForm.value.reference;

      this.userService.getUserByAccountNumber(recipientAccountNumber).subscribe(
        recipient => {
          if (recipient) {
            if (amount > this.sender!.initialBalance) {
              this.transferForm.get('amount')?.setErrors({ insufficientFunds: true });
              return;
            }

            recipient.initialBalance += amount;
            this.userService.updateUser(recipient.id, recipient).subscribe(
              () => {
                if (this.sender) {
                  this.sender.initialBalance -= amount;
                  this.userService.updateUser(this.sender.id, this.sender).subscribe(
                    () => {
                      const transaction: Transaction = {
                        transactionType: 'transfer',
                        amount: amount,
                        recipientAccountNumber: recipient.accountNumber,
                        senderAccountNumber: this.sender!.accountNumber,
                        reference: reference,
                        sender: this.sender!.username,
                        recipient: recipient.username
                      };
                      this.transactionService.createTransaction(transaction).subscribe(
                        () => {
                          console.log('Transaction created successfully');
                          this.router.navigate(['/dashboard']);
                        },
                        error => {
                          console.error('Error creating transaction', error);
                        }
                      );
                    },
                    error => {
                      console.error('Error updating sender balance', error);
                    }
                  );
                }
              },
              error => {
                console.error('Error updating recipient balance', error);
              }
            );
          } else {
            console.error('Recipient not found');
          }
        },
        error => {
          console.error('Error fetching recipient user data', error);
        }
      );
    }
  }
}
