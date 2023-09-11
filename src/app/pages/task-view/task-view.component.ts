import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TaskService } from 'src/app/services/tasks/task.service';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';
import { ListType } from 'src/app/shared/types/listType';
import { TaskType } from 'src/app/shared/types/taskType';
import { ListService } from './../../services/lists/list.service';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  // listId: string = '';
  listId = signal<string | undefined>('');
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

    this.activateRoute.params
      .subscribe({ next: (( params: Params ) => {
        console.log('Params Change: ', params);
        console.log('Params Change: ', params['listId']);
        console.log('Params Change: ', typeof(params['listId']));

        if(params['listId']) this.listId.set(params['listId'])
      })
    });

  }

  listIdChangeEffect = effect(() => {
    console.log('effect works.');

    if(!this.listId()){

      this.listService.getLists()
        .pipe(tap(() =>  console.log('getLists works')) )
        .subscribe({
          next: (arrayOfLists: ListType[]) => {
            this.listsArray = arrayOfLists;
          }
        })

    }else{

      this.listService.getLists() //=> IMPO: Merge With The Following Observeble.
        .pipe(
          switchMap((arrayOfLists: ListType[]) => {
            this.listsArray = arrayOfLists;
            this.showHiddenSidebar = false;
            return this.taskService.getTasks(this.listId() as string);
          })
        )
        .subscribe({
          next: ((arrayOfTasks: TaskType[]) => {
            this.tasksArray = arrayOfTasks;
            this.sortTasksArray();
          }),
          error: (error: ErrorBodyType) => {
            this.router.navigateByUrl('');
            this.toastr.error(error.message, 'Error');
          }
        })

    }

  })

  sortTasksArray(){
    if(!this.tasksArray) return;
    this.tasksArray.sort((taskOne, taskTwo) => {

      if (taskOne.completed && !taskTwo.completed) return 1;
      if (!taskOne.completed && taskTwo.completed) return -1;
      return 0;

    })
  }

  dropdownVisibilityToggle(){
    this.dropdownVisibility = !this.dropdownVisibility;
  }

  deleteList(){
    this.listService.deleteList(this.listId() as string)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('');
        }
      });
  }

  taskClicked(taskDocument: TaskType){
    taskDocument.completed = !taskDocument.completed;
    this.taskService.editTask( taskDocument ).subscribe({
      next: (updateTaskDocument: TaskType) =>{
        this.sortTasksArray();
      }
    });
  }

  deleteTask(event: Event, taskDocument: TaskType){
    event.stopPropagation();
    this.taskService.deleteTask(taskDocument)
      .subscribe({
        next: (res: any) => {
          this.redirectTo(`lists/${this.listId()}`);
        }
      });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  logoutButtonClicked(){
    this.authService.logout();
  }

  noteIconClicked(){
    this.showHiddenSidebar = !this.showHiddenSidebar;
  }

}


  // ngOnInit() {

  //   this.listService.getLists() //=> IMPO: Merge With The Following Observeble.
  //     .pipe(tap(() =>  console.log('getLists works')) )
  //     .subscribe({
  //       next: (arrayOfLists: ListType[]) => {

  //         this.listsArray = arrayOfLists;
  //       }
  //     })

  //   this.activateRoute.params
  //     .pipe(
  //       switchMap((params: Params) => {
  //         this.showHiddenSidebar = false;
  //         this.listId() = params['listId'];
  //         if(!this.listId()) return of(undefined);
  //         return this.taskService.getTasks(this.listId());
  //       }),
  //       tap((arrayOfTasks: TaskType[] | undefined) => {

  //         this.tasksArray = arrayOfTasks;

  //         this.sortTasksArray(); //=> Repeat

  //       })
  //     ).subscribe({
  //       next: (arrayOfTasks: TaskType[] | undefined) => {

  //         this.tasksArray = arrayOfTasks;

  //         this.sortTasksArray(); //=> Repeat

  //       },
  //       error: (error: ErrorBodyType) => {
  //         this.router.navigateByUrl('');
  //         this.toastr.error(error.message, 'Error');
  //       }
  //     })

  // }
