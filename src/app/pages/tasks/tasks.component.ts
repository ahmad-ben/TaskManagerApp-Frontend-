import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
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

export class TasksComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  isMobile: Boolean = window.innerWidth < 640;
  dropdownVisibility: boolean = false;

  @Input('listId') listId: string = '';
  @Input('tasksArray') tasksArray?: TaskType[];
  @Input('listsComponent') listsCom!: ListsComponent;

  router = inject(Router);
  taskService = inject(TaskService);
  changeDetectorRef = inject(ChangeDetectorRef);

  deleteList(){
    this.listsCom.deleteList();
  }

  taskClicked(taskDocument: TaskType) {
    taskDocument.completed = !taskDocument.completed;
    this.taskService.editTask(taskDocument).subscribe({
      next: (updateTaskDocument: TaskType) => {
        this.sortTasksArray(this.tasksArray!);
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

  sortTasksArray(tasksArray: TaskType[] | undefined) {
    if (tasksArray == undefined ) return;

    this.tasksArray = tasksArray.sort((taskOne, taskTwo) => {
      if (taskOne.completed && !taskTwo.completed) return 1;
      if (!taskOne.completed && taskTwo.completed) return -1;
      return 0;
    });

  }

}
