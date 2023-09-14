import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkingSpinnersService {

  private arrayOfWorkingSpinners: string[]= [];
  arrayOfWorkingSpinners$ = new BehaviorSubject(this.arrayOfWorkingSpinners);

  spinnerStartsWorking(spinnerName: string){
    if(this.arrayOfWorkingSpinners.includes(spinnerName)) return;

    this.arrayOfWorkingSpinners.push(spinnerName);
    this.arrayOfWorkingSpinners$.next(this.arrayOfWorkingSpinners)
  }

  spinnerFinishesWorking(spinnerName: string){
    if(!this.arrayOfWorkingSpinners.includes(spinnerName)) return;

    this.arrayOfWorkingSpinners = this.arrayOfWorkingSpinners
      .filter((workingSpinner) => workingSpinner !== spinnerName);
    this.arrayOfWorkingSpinners$.next(this.arrayOfWorkingSpinners)
  }


}
