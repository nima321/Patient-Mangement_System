import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';  // Change here to use "confirmPassword"
  role: string = 'User';
  message: string = '';
  errorMessage: string = '';
  response: string='';

  constructor(private http: HttpClient, private router: Router) {}

  
  

  // Register method
  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
    this.http.post('http://localhost:5242/api/auth/register', {
      username: this.username,
      passwordHash: this.password,
      role: this.role
    }).subscribe(
      (response) => {
        if (response ==="User registered successfully!") {
          this.message = 'User registered successfully!';
           
        }
      },
      (error) => {
        alert('You have been successfully registered!');  // Show the success popup
          setTimeout(() => this.router.navigate(['/login']), 1500); // Wait 1.5 seconds before navigating
      }
    );
  }
}
