import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']); // ✅ Should redirect
  }
}
