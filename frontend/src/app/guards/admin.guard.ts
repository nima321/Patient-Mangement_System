import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role'); // Get role from localStorage
    if (role === 'Admin') {
      return true; // Allow access if Admin
    } else {
      alert('Access Denied! Only Admins can access this page.');
      return false;
    }
  }
}
