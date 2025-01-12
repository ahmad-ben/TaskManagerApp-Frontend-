import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CancelButtonComponent } from 'src/app/components/buttons/cancel-button/cancel-button.component';
import { ChangeButtonComponent } from 'src/app/components/buttons/change-button/change-button.component';
import { CheckWhiteSpaceDirective } from 'src/app/directives/whiteSpace/check-white-space.directive';
import { TaskService } from 'src/app/services/tasks/task.service';
import { lastErrorHandlerFun } from 'src/app/shared/functions/lastErrorHandlerFun';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';
import { TaskType } from 'src/app/shared/types/taskType';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ChangeButtonComponent,
    CancelButtonComponent,
    CheckWhiteSpaceDirective
  ],
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit, AfterViewInit  {
  inputValue: string = "";
  buttonClicked: boolean = false;
  listId!: string;
  errorMessage: string = '';
  isProcessing: boolean = false;

  @ViewChild('inputControlState', { read: ElementRef }) inputControlState?:ElementRef<HTMLInputElement>;

  taskService = inject(TaskService);
  router = inject(Router);
  activateRoute = inject(ActivatedRoute);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.listId = this.activateRoute.snapshot.params['listId'];
  }

  ngAfterViewInit(){
    this.inputControlState?.nativeElement.focus();
  }

  createTask(newTaskForm: NgForm){

    this.buttonClicked = true;
    if(newTaskForm.invalid) return;

    this.isProcessing = true;
  
    this.taskService.createTask(this.listId, this.inputValue)
      .subscribe({
        next: (newTaskFromDB: TaskType) => {
          this.router.navigateByUrl(`/homePage/lists/${newTaskFromDB._listId}`);
        },
        error: (error: ErrorBodyType) => {
          this.errorMessage = lastErrorHandlerFun(
            error, this.router, this.toastr
          ) || '';
          this.isProcessing = false;
        }
      })

  }

}
