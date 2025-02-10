import { Component } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  username: string = '';
  password: string = '';
  role: string = 'User';
  errorMessage: string = '';
  successMessage: string ='';
  

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({
       username: this.username,
       password: this.password,
       
      }).subscribe(
      (response: any) => {
        console.log(response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
         // Reset error message and set success message
         this.errorMessage = '';
         this.successMessage = 'Login successful! Redirecting...';

        if (response.role === 'Admin') {
          this.router.navigate(['/home']);
        } else {

          this.router.navigate(['/home']);
        }
      },
      (error) => {
        // Error handling
        this.successMessage = ''; // Clear success message
        this.errorMessage = 'Invalid credentials'; // Set error message
      }
    );
  }
}
