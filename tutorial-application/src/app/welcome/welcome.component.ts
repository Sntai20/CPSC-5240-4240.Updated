// welcome.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  standalone: false,
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  
  loginWithSSO() {
    // Redirect to your Express server's Google OAuth endpoint
    window.location.href = 'http://localhost:8080/auth/google';
  }
}