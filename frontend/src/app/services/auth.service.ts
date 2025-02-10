// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5242/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user, { headers: { 'Content-Type': 'application/json' } });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();  // Returns true if token exists, false if not
  }
}
