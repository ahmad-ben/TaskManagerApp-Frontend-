import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectButtonComponent } from "../buttons/redirect-button/redirect-button.component";
import { AuthService } from 'src/app/services/auth/auth.service';
import { MenusStateService } from 'src/app/services/subjects/menus-state.service';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'top-navbar',
  standalone: true,
  imports: [CommonModule, RedirectButtonComponent, LinkComponent],
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  menusStateService = inject(MenusStateService);

  authService = inject(AuthService);

  logoutButtonClicked() {
    this.authService.logout();
  }

  visitLink(url: string){
    window.open(url, "_blank");
  }

  dropdownVisibilityToggle($event: MouseEvent) {
    $event.stopPropagation();

    if(this.menusStateService.reposSourcesMenuState$.value) 
      return this.menusStateService.closeAllMenus();
    
    this.menusStateService.closeAllMenus();
    this.menusStateService.reposSourcesMenuState$.next(true); 
  }
}
