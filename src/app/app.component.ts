import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WebRequestService } from './services/web/web-request.service';
import { MenusStateService } from './services/subjects/menus-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgxSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NoteItNow';
  demoLink = `
    <a 
      href="https://youtu.be/U6L4dNBETH0?si=Y9gNLkmNbNx0ovQE" target="_blank"
    >See Website Demo</a>
  `;
  message = `
    The back-end is hosted on free providers.<br>
    You may experience a delay of up to 1 minute on your first request.<br>
    Thank you for your understanding 🌹.<br>
    ${this.demoLink}
  `;

  toastr = inject(ToastrService);
  webReqService = inject(WebRequestService);
  menusStateService = inject(MenusStateService);

  ngOnInit(){
    const notNewVisiter = sessionStorage.getItem("notNewVisiter");
    
    if(!notNewVisiter){
      sessionStorage.setItem("notNewVisiter", "yes");
      this.toastr.warning(this.message, "Reminder", {
        timeOut: 30000,
        closeButton: true,
        enableHtml: true,
        toastClass: "ngx-toastr class-test"
      });    
    };

    return this.webReqService.get('test').subscribe();
  };

  @HostListener('document:click', ['$event'])
  onKeyDown(event: MouseEvent) {
    this.menusStateService.closeAllMenus();
  }

}
