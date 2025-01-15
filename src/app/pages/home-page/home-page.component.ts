import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListType } from 'src/app/shared/types/listType';
import { TaskType } from 'src/app/shared/types/taskType';
import { ListsComponent } from '../lists/lists.component';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    ListsComponent,
    TasksComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit, AfterViewInit{
  @ViewChild('tasksComponent') tasksComponent?: TasksComponent;

  listId: string = '';
  listsArray: ListType[] = [];
  tasksArray: TaskType[] | undefined;
  showHiddenSidebar: boolean = false;

  activateRoute = inject(ActivatedRoute);
  authService = inject(AuthService);

  ngOnInit() {
    this.activateRoute.params.subscribe({
      next: (params: Params) => {
        if (!params['listId'])
          return (this.listsArray = this.activateRoute.snapshot.data['lists']);

        const arrayOfListsAndTasks: (ListType[] | TaskType[])[] =
        this.activateRoute.snapshot.data['listsAndTasksArray'];
        this.listsArray = arrayOfListsAndTasks[0] as ListType[];
        this.tasksArray = arrayOfListsAndTasks[1] as TaskType[];

        setTimeout(() => {}, 0);
        this.listId = params['listId'];
        this.showHiddenSidebar = false;
        this.tasksComponent?.sortTasksArray(this.tasksArray);
      },
    });
  }

  ngAfterViewInit() {
    this.tasksComponent!.sortTasksArray(this.tasksArray);
  }

  noteIconClicked() {
    this.showHiddenSidebar = !this.showHiddenSidebar;
  }

  logoutButtonClicked() {
    this.authService.logout();
  }
}

