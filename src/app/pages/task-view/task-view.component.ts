import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TaskService } from 'src/app/services/tasks/task.service';
import { ListType } from 'src/app/shared/types/listType';
import { TaskType } from 'src/app/shared/types/taskType';
import { ListService } from './../../services/lists/list.service';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  listId: string = '';
  listsArray: ListType[] = [];
  tasksArray: TaskType[] | undefined;
  dropdownVisibility: boolean = false;
  showHiddenSidebar: boolean = false;
  isMobile: Boolean = window.innerWidth < 640;

  listService = inject(ListService);
  taskService = inject(TaskService);
  activateRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  router = inject(Router);
  toastr = inject(ToastrService);

  ngOnInit() {
    this.activateRoute.params.subscribe({
      next: (params: Params) => {
        console.log('activateRoute works');

        if (!params['listId'])
          return (this.listsArray = this.activateRoute.snapshot.data['lists']);

        const arrayOfListsAndTasks: (ListType[] | TaskType[])[] =
          this.activateRoute.snapshot.data['listsAndTasksArray'];
        this.listsArray = arrayOfListsAndTasks[0] as ListType[];
        this.tasksArray = arrayOfListsAndTasks[1] as TaskType[];
        this.listId = params['listId'];
        this.showHiddenSidebar = false;
        this.sortTasksArray();
      },
    });
  }

  sortTasksArray() {
    if (!this.tasksArray) return;
    this.tasksArray.sort((taskOne, taskTwo) => {
      if (taskOne.completed && !taskTwo.completed) return 1;
      if (!taskOne.completed && taskTwo.completed) return -1;
      return 0;
    });
  }

  dropdownVisibilityToggle() {
    this.dropdownVisibility = !this.dropdownVisibility;
  }

  deleteList() {
    this.listService.deleteList(this.listId as string).subscribe({
      next: (res) => {
        this.router.navigateByUrl('');
      },
    });
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
        this.redirectTo(`lists/${this.listId}`);
      },
    });
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  logoutButtonClicked() {
    this.authService.logout();
  }

  noteIconClicked() {
    this.showHiddenSidebar = !this.showHiddenSidebar;
  }
}
