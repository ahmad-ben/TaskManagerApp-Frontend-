import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WebRequestService } from './services/web/web-request.service';

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

  toastr = inject(ToastrService);
  webReqService = inject(WebRequestService);

  ngOnInit(){
    const notNewVisiter = sessionStorage.getItem("notNewVisiter");
    
    if(!notNewVisiter){
      sessionStorage.setItem("notNewVisiter", "yes");
      this.toastr.warning(
        `The back-end is hosted on free providers. 
        You may experience a delay on your first request. 
        Thank you for your understanding 🌹.`,
        "Reminder",
        { timeOut: 15000, closeButton: true }
      );      
    };

    return this.webReqService.get('test').subscribe();
  };

}
