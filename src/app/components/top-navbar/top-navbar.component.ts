import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectButtonComponent } from "../buttons/redirect-button/redirect-button.component";
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'top-navbar',
  standalone: true,
  imports: [CommonModule, RedirectButtonComponent],
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  authService = inject(AuthService);

  logoutButtonClicked() {
    this.authService.logout();
  }

  visitLink(url: string){
    window.open(url, "_blank");
  }
}
