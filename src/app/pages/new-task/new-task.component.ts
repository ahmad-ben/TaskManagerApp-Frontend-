import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CheckWhiteSpaceDirective } from 'src/app/directives/whiteSpace/check-white-space.directive';
import { TaskService } from 'src/app/services/tasks/task.service';
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
export class NewTaskComponent implements OnInit {
  inputValue: string = "";
  buttonClicked: boolean = false;
  listId!: string;

  taskService = inject(TaskService);
  route = inject(Router);
  activateRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.listId = this.activateRoute.snapshot.params['listId'];
  }

  createTask(newTaskForm: NgForm){

    this.buttonClicked = true;
    if(newTaskForm.invalid) return;

    this.taskService.createTask(this.listId, this.inputValue)
      .subscribe({
        next: (newTaskFromDB: TaskType) => {
          this.route.navigateByUrl(`/lists/${newTaskFromDB._listId}`);
        }
      })

  }

}
