import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CancelButtonComponent } from 'src/app/components/buttons/cancel-button/cancel-button.component';
import { ChangeButtonComponent } from 'src/app/components/buttons/change-button/change-button.component';
import { CheckWhiteSpaceDirective } from 'src/app/directives/whiteSpace/check-white-space.directive';
import { ListService } from 'src/app/services/lists/list.service';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';
import { ToastrService } from 'ngx-toastr';  
import { showSuccessToaster } from 'src/app/shared/functions/showSuccessToaster';

@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChangeButtonComponent,
    CancelButtonComponent,
    CheckWhiteSpaceDirective
  ],
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})

export class NewListComponent implements AfterViewInit {
  inputValue: string = "";
  buttonClicked: boolean = false;
  errorMessage: string = '';

  isProcessing: boolean = false;
  isCanceling: boolean = false;

  
  @ViewChild('inputControlState', { read: ElementRef }) inputControlState?:ElementRef<HTMLInputElement>;
  
  listService = inject(ListService);
  route = inject(Router);
  toastr = inject(ToastrService);

  ngAfterViewInit(){
    this.inputControlState?.nativeElement.focus();
  }

  createList(newListForm: NgForm){

    this.buttonClicked = true;
    if(newListForm.invalid) return;

    this.isProcessing = true;
    this.listService.createList(this.inputValue)
      .subscribe({
        next: (newListFromDB: any) => {
          this.route.navigateByUrl(`/homePage/lists/${newListFromDB._id}`)
          showSuccessToaster(this, "", "New List Added");
        },
        error: (error: ErrorBodyType) => {
          this.errorMessage = error.message;
          this.isProcessing = false;
        }
      })

  }

}


