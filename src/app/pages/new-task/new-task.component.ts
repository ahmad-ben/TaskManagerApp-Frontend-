import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckWhiteSpaceDirective } from 'src/app/directives/whiteSpace/check-white-space.directive';
import { TaskService } from 'src/app/services/tasks/task.service';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';
import { TaskType } from 'src/app/shared/types/taskType';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
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
    // if(newTaskForm.invalid) return;

    this.taskService.createTask(this.listId, this.inputValue)
      .subscribe({
        next: (newTaskFromDB: TaskType) => {
          this.router.navigateByUrl(`/lists/${newTaskFromDB._listId}`);
        },
        error: (error: ErrorBodyType) => {
          if(error.shouldNavigate) {
            this.router.navigateByUrl('');
            return this.toastr.error(error.message, 'Error');
          }
          return this.errorMessage = error.message;
        }
      })

  }

}
