import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from 'src/app/services/tasks/task.service';
import { TaskType } from 'src/app/shared/types/taskType';
import { ListsComponent } from './../lists/lists.component';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ListsComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  isMobile: Boolean = window.innerWidth < 640;
  dropdownVisibility: boolean = false;

  @Input('listId') listId: string = '';
  @Input('tasksArray') tasksArray?: TaskType[];
  @Input('listsComponent') listsCom!: ListsComponent;

  router = inject(Router);
  taskService = inject(TaskService);

  deleteList(){
    this.listsCom.deleteList();
  }

  taskClicked(taskDocument: TaskType) {
    taskDocument.completed = !taskDocument.completed;
    this.taskService.editTask(taskDocument).subscribe({
      next: (updateTaskDocument: TaskType) => {
        this.sortTasksArray();
      },
    });
  }

  deleteTask(event: Event, taskDocument: TaskType) {
    event.stopPropagation();
    this.taskService.deleteTask(taskDocument).subscribe({
      next: (res: any) => {
        if(!this.tasksArray?.includes(taskDocument)) return;
        this.tasksArray = this.tasksArray
          .filter((taskDocumentFromArray) => taskDocumentFromArray !== taskDocument);
      },
    });
  }

  dropdownVisibilityToggle() {
    this.dropdownVisibility = !this.dropdownVisibility;
  }

  sortTasksArray() {
    if (!this.tasksArray) return;
    this.tasksArray.sort((taskOne, taskTwo) => {
      if (taskOne.completed && !taskTwo.completed) return 1;
      if (!taskOne.completed && taskTwo.completed) return -1;
      return 0;
    });
  }

}
