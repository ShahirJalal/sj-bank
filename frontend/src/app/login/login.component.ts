import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        user => {
          console.log('User logged in successfully');
          localStorage.setItem('id', user.id.toString());
          localStorage.setItem('username', user.username);
          // localStorage.setItem('password', user.password);
          // localStorage.setItem('role', user.role);
          // localStorage.setItem('accountNumber', user.accountNumber);
          // localStorage.setItem('initialBalance', user.initialBalance.toString());
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error logging in user', error);
        }
      );
    }
  }
}
