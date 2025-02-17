import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenusStateService {
  tasksMenuState$ = new BehaviorSubject<boolean>(false);
  reposSourcesMenuState$ = new BehaviorSubject<boolean>(false);

  closeAllMenus(){
    this.tasksMenuState$.next(false);
    this.reposSourcesMenuState$.next(false);
  };
}