import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckWhiteSpaceDirective } from 'src/app/directives/whiteSpace/check-white-space.directive';
import { ListService } from 'src/app/services/lists/list.service';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';

@Component({
  selector: 'app-edit-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
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
    // if(editedListForm.invalid) return;//=> Return this protection step later

    this.listService.editList(this.listId, this.inputValue)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl(`lists/${this.listId}`)
        },
        error: (error: ErrorBodyType) => {
          if(error.shouldNavigate) {
            this.router.navigateByUrl('');
            return this.toastr.error(error.message, 'Error');
          }
          return this.errorMessage = error.message;
        }
      });

  }

}
