import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // private baseUrl = 'http://localhost:8080/api/transactions';
  private baseUrl = 'https://sj-bank-backend-93e1d47260fe.herokuapp.com/api/transactions';

  constructor(private http: HttpClient) { }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, transaction);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/${id}`);
  }

  getTransactionsByUsername(username: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/user/${username}`);
  }
}
