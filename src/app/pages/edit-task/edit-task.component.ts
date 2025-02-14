import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize, switchMap } from 'rxjs';
import { CancelButtonComponent } from 'src/app/components/buttons/cancel-button/cancel-button.component';
import { ChangeButtonComponent } from 'src/app/components/buttons/change-button/change-button.component';
import { CheckWhiteSpaceDirective } from 'src/app/directives/whiteSpace/check-white-space.directive';
import { WorkingSpinnersService } from 'src/app/services/spinners-state/working-spinner.service';
import { TaskService } from 'src/app/services/tasks/task.service';
import { lastErrorHandlerFun } from 'src/app/shared/functions/lastErrorHandlerFun';
import { showSuccessToaster } from 'src/app/shared/functions/showSuccessToaster';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';
import { TaskType } from 'src/app/shared/types/taskType';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChangeButtonComponent,
    CancelButtonComponent,
    CheckWhiteSpaceDirective
  ],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})

export class EditTaskComponent implements OnInit, AfterViewInit {

  inputValue: string = '';
  buttonClicked: boolean = false;
  listId: string = '';
  taskId: string = '';
  taskObj?: TaskType;
  errorMessage: string = '';

  isProcessing: boolean = false;
  isCanceling: boolean = false;

  @ViewChild('inputControlState', { read: ElementRef }) 
    inputControlState?:ElementRef<HTMLInputElement>;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  taskService = inject(TaskService);
  toastr = inject(ToastrService);
  spinner = inject(NgxSpinnerService);
  workingSpinners = inject(WorkingSpinnersService);

  ngOnInit(){
    this.listId = this.activatedRoute.snapshot.params['listId'];
    this.taskId = this.activatedRoute.snapshot.params['taskId'];
  }

  ngAfterViewInit(){
    this.inputControlState?.nativeElement.focus();
  }

  editTask(editedTaskForm: NgForm){

    this.buttonClicked = true;
    if(editedTaskForm.invalid) return;

    this.isProcessing = true;

    this.taskService.getTask(this.listId, this.taskId)
      .pipe(
        switchMap((taskObj: TaskType) => {
          this.taskObj = taskObj;
          return this.taskService.editTask(this.taskObj!, this.inputValue)
        }),
        finalize(() => {})
      )
      .subscribe({
        next: (updatedTaskObj: TaskType) => {
          this.router.navigateByUrl(`homePage/lists/${this.listId}`);
          showSuccessToaster(this, "", "Task Successfully Edited.")
        },
        error: (error: ErrorBodyType) => {
          this.errorMessage = lastErrorHandlerFun(
            error, this.router, this.toastr
          ) || '';
          this.isProcessing = false;
        }
      });

  }

}
