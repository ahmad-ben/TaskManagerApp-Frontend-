import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CheckWhiteSpaceDirective } from 'src/app/directives/whiteSpace/check-white-space.directive';
import { ListService } from 'src/app/services/lists/list.service';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';


@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    CheckWhiteSpaceDirective
  ],
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})

export class NewListComponent implements AfterViewInit {
  inputValue: string = "";
  buttonClicked: boolean = false;
  errorMessage: string = '';

  @ViewChild('inputControlState', { read: ElementRef }) inputControlState?:ElementRef<HTMLInputElement>;

  listService = inject(ListService);
  route = inject(Router);

  ngAfterViewInit(){
    this.inputControlState?.nativeElement.focus();
  }

  createList(newListForm: NgForm){

    this.buttonClicked = true;
    if(newListForm.invalid) return; //=> IMPO: Return later

    this.listService.createList(this.inputValue)
      .subscribe({
        next: (newListFromDB: any) => {
          this.route.navigateByUrl(`/lists/${newListFromDB._id}`);
        },
        error: (error: ErrorBodyType) => {
          this.errorMessage = error.message;
        }
      })

  }

}


