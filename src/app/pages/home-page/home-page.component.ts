import { CommonModule, Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListType } from 'src/app/shared/types/listType';
import { TaskType } from 'src/app/shared/types/taskType';
import { ListsComponent } from '../lists/lists.component';
import { TasksComponent } from '../tasks/tasks.component';
import { TopNavbarComponent } from "../../components/top-navbar/top-navbar.component";
import { finalize } from 'rxjs';
import { ListService } from 'src/app/services/lists/list.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    ListsComponent,
    TasksComponent,
    TopNavbarComponent
],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit, AfterViewInit{
  @ViewChild('tasksComponent') tasksComponent!: TasksComponent;
  dropdownVisibility: boolean = false;

  listId: string = '';
  listsArray: ListType[] = [];
  tasksArray: TaskType[] | undefined;
  showHiddenSidebar: boolean = false;

  activateRoute = inject(ActivatedRoute);
  listService = inject(ListService);
  location = inject(Location);

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

  deleteList(){
    this.listService.deleteList(this.listId)
    .pipe(finalize(() => { 
      this.changeDropdownVisibility(false);
      this.tasksComponent.isLoading = false;
    }))
    .subscribe({
      next: (res) => {
        this.listsArray = this.listsArray.filter(
          (list) => list._id !== this.listId
        );
        this.tasksArray = [];
        this.listId = '';
        this.location.replaceState("/homePage/lists/");
      },
    });
  }

  ngAfterViewInit() {
    this.tasksComponent.sortTasksArray(this.tasksArray);
  }

  noteIconClicked() {
    this.showHiddenSidebar = !this.showHiddenSidebar;
  }

  changeDropdownVisibility(visibilityValue: boolean) {
    this.dropdownVisibility = visibilityValue;
  }
}