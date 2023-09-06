import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CheckWhiteSpaceDirective } from 'src/app/directives/whiteSpace/check-white-space.directive';
import { TaskService } from 'src/app/services/tasks/task.service';
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

export class EditTaskComponent {

  inputValue: string = '';
  buttonClicked: boolean = false;
  listId: string = '';
  taskId: string = '';
  taskObj?: TaskType;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  taskService = inject(TaskService);

  ngOnInit(){
    this.listId = this.activatedRoute.snapshot.params['listId'];
    this.taskId = this.activatedRoute.snapshot.params['taskId'];
    this.taskService.getTask(this.listId, this.taskId).subscribe({
      next: (res) => {
        this.taskObj = res;
      }
    })
  }

  editTask(editedTaskForm: NgForm){

    this.buttonClicked = true;
    if(editedTaskForm.invalid || !this.taskObj) return;

    this.taskService.editTask(this.taskObj, this.inputValue)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl(`lists/${this.listId}`)
        }
      });

  }

}
