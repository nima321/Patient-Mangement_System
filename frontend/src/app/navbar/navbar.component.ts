// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the import path if needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isAuthenticated: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}  // Make authService public

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to login page
  }
  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
