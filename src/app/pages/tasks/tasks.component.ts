import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from 'src/app/services/tasks/task.service';
import { TaskType } from 'src/app/shared/types/taskType';
import { ListsComponent } from './../lists/lists.component';
import { BehaviorSubject, combineLatestWith, finalize, map, merge, mergeAll, Observable, Subject } from 'rxjs';
import { DeleteButtonComponent } from "../../components/buttons/delete-button/delete-button.component";
import { MenusStateService } from 'src/app/services/subjects/menus-state.service';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DeleteButtonComponent
],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent{
  isMobile: Boolean = window.innerWidth < 640;
  deletedTaskId: string | null = null;
  // Represent if a HTTP request is in progress in general like create, update, delete.
  isLoading: boolean = false;

  @Input('listId') listId: string = '';
  @Input('tasksArray') tasksArray?: TaskType[];
  @Input('listsComponent') listsCom!: ListsComponent;
  @Input('dropdownVisibility') dropdownVisibility!: boolean;

  @Output('changeDropdownVisibility') changeDropdownVisibility = new EventEmitter();
  @Output('deleteList') deleteListEvent = new EventEmitter();


  router = inject(Router);
  taskService = inject(TaskService);
  changeDetectorRef = inject(ChangeDetectorRef);
  menusStateService = inject(MenusStateService);

  deleteList(){
    this.isLoading = true;
    this.deleteListEvent.emit();
  }

  deleteAllTasks() {
    this.isLoading = true;
    this.taskService.deleteAllTasks(this.listId)
    .pipe( finalize(() => {
      this.isLoading = false;
      this.changeDropdownVisibility.emit(false);
    }) )
    .subscribe({
      next: (res: any) => this.tasksArray = []
    });
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
    this.deletedTaskId = taskDocument._id;

    this.taskService.deleteTask(taskDocument).pipe(
      finalize(() => this.deletedTaskId = null)
    ).subscribe({
      next: (res: any) => {
        if(!this.tasksArray?.includes(taskDocument)) return;
        this.tasksArray = this.tasksArray
          .filter((taskDocumentFromArray) => taskDocumentFromArray !== taskDocument);
      },
    });
  }

  dropdownVisibilityToggle($event: MouseEvent) {
    $event.stopPropagation();

    if(this.menusStateService.tasksMenuState$.value) 
      return this.menusStateService.closeAllMenus();
    
    this.menusStateService.closeAllMenus();
    this.menusStateService.tasksMenuState$.next(true); 
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