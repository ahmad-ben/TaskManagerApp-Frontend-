import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CancelButtonComponent } from 'src/app/components/buttons/cancel-button/cancel-button.component';
import { ChangeButtonComponent } from 'src/app/components/buttons/change-button/change-button.component';
import { CheckWhiteSpaceDirective } from 'src/app/directives/whiteSpace/check-white-space.directive';
import { ListService } from 'src/app/services/lists/list.service';
import { lastErrorHandlerFun } from 'src/app/shared/functions/lastErrorHandlerFun';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';

@Component({
  selector: 'app-edit-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ChangeButtonComponent,
    CancelButtonComponent,
    CheckWhiteSpaceDirective
  ],
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})

export class EditListComponent implements OnInit, AfterViewInit {
  inputValue: string = '';
  buttonClicked: boolean = false;
  listId: string = '';
  errorMessage: string = '';

  isProcessing: boolean = false;
  isCanceling: boolean = false;

  @ViewChild('inputControlState', { read: ElementRef }) inputControlState?:ElementRef<HTMLInputElement>;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  listService = inject(ListService);
  toastr = inject(ToastrService);

  ngOnInit(){
    this.listId = this.activatedRoute.snapshot.params['listId'];
  }

  ngAfterViewInit(){
    this.inputControlState?.nativeElement.focus();
  }

  editList(editedListForm: NgForm){
    this.buttonClicked = true;
    if(editedListForm.invalid) return;

    this.isProcessing = true;
    this.listService.editList(this.listId, this.inputValue)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl(`homePage/lists/${this.listId}`)
        },
        error: (error: ErrorBodyType) => {
          this.errorMessage = lastErrorHandlerFun(
            error, this.router, this.toastr
          ) || '';
          this.isProcessing = false;
        },
      });

  }

}