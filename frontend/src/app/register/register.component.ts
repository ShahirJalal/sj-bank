import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      accountNumber: ['', Validators.required],
      initialBalance: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe(
        () => {
          console.log('User registered successfully');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    }
  }
}
