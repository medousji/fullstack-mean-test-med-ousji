import { Component, signal, computed } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { AuthService } from './auth/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, NgIf, NgTemplateOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('blog-frontend');
  username = computed(() => localStorage.getItem('username'));
  isLoggedIn = computed(() => this.auth.hasToken());

  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
