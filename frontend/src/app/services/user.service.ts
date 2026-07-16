import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private baseUrl = 'http://localhost:8080/api/users';
  private baseUrl = 'https://sj-bank-backend-93e1d47260fe.herokuapp.com/api/users';

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getUserByAccountNumber(accountNumber: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/account/${accountNumber}`);
  }

  updateUser(id: number, newUser: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, newUser);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  login(loginData: { username: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, loginData);
  }
}
