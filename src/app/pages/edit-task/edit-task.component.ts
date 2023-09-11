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

  ngOnInit(){
    console.log('ngOorks!');

    this.listId = this.activatedRoute.snapshot.params['listId'];
    this.taskId = this.activatedRoute.snapshot.params['taskId'];
    this.taskService.getTask(this.listId, this.taskId).subscribe({
      next: (res) => {
        this.taskObj = res;
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

  ngAfterViewInit(){
    this.inputControlState?.nativeElement.focus();
  }

  editTask(editedTaskForm: NgForm){

    this.buttonClicked = true;
    // if(editedTaskForm.invalid || !this.taskObj) return;

    this.taskService.editTask(this.taskObj!, this.inputValue)//=> Remove !
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
        } //=> IMPO: Repeat a lot create a function for.
      });

  }

}
