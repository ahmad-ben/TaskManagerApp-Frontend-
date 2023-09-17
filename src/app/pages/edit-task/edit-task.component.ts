import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize, switchMap } from 'rxjs';
import { CheckWhiteSpaceDirective } from 'src/app/directives/whiteSpace/check-white-space.directive';
import { WorkingSpinnersService } from 'src/app/services/spinners-state/working-spinner.service';
import { TaskService } from 'src/app/services/tasks/task.service';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';
import { TaskType } from 'src/app/shared/types/taskType';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
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

  @ViewChild('inputControlState', { read: ElementRef }) inputControlState?:ElementRef<HTMLInputElement>;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  taskService = inject(TaskService);
  toastr = inject(ToastrService);
  spinner = inject(NgxSpinnerService);
  workingSpinners = inject(WorkingSpinnersService);

  ngOnInit(){
    console.log('ngOorks!');

    this.listId = this.activatedRoute.snapshot.params['listId'];
    this.taskId = this.activatedRoute.snapshot.params['taskId'];
  }

  ngAfterViewInit(){
    this.inputControlState?.nativeElement.focus();
  }

  editTask(editedTaskForm: NgForm){

    this.buttonClicked = true;
    if(editedTaskForm.invalid) return;
    this.spinner.show('editTask');
    this.workingSpinners.spinnerStartsWorking('editTask');

    this.taskService.getTask(this.listId, this.taskId)
      .pipe(
        switchMap((taskObj: TaskType) => {
          this.taskObj = taskObj;
          return this.taskService.editTask(this.taskObj!, this.inputValue)
        }),
        finalize(() => {
          this.spinner.hide('editTask');
          this.workingSpinners.spinnerFinishesWorking('editTask');
        })
      )
      .subscribe({
        next: (updatedTaskObj: TaskType) => {
          this.router.navigateByUrl(`homePage/lists/${this.listId}`)
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
