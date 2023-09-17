import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, finalize, map, switchMap, tap } from 'rxjs';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { ListService } from './services/lists/list.service';
import { WorkingSpinnersService } from './services/spinners-state/working-spinner.service';
import { TaskService } from './services/tasks/task.service';
import { ErrorBodyType } from './shared/types/errorBodyResponse';
import { ListType } from './shared/types/listType';
import { TaskType } from './shared/types/taskType';

export const listsResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const toastr = inject(ToastrService);
    const router = inject(Router);
    const spinner = inject(NgxSpinnerService);
    const workingSpinners = inject(WorkingSpinnersService);
    console.log('listsResolver works');
    console.log('starts here');

    spinner.show('getLists');
    workingSpinners.spinnerStartsWorking('getLists');
    return inject(ListService).getLists()
      .pipe(
        tap(() => {
          console.log(route.params);
        }),
        catchError((error: ErrorBodyType) => {
          router.navigateByUrl('');
          toastr.error(error.message);
          return [];
        }),
        finalize(() => {
          console.log('finalize here');
            spinner.hide('getLists');
            workingSpinners.spinnerFinishesWorking('getLists');
        })
      )

  };

export const listsAndTasksResolver: ResolveFn<Observable<(ListType[] | TaskType[])[]>> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    console.log('listsAndTasksResolver works');

    const taskService = inject(TaskService);
    const toastr = inject(ToastrService);
    const router = inject(Router);
    const spinner = inject(NgxSpinnerService);
    const listId = route.params['listId'];
    const arrayOfListsAndTasks : (ListType[] | TaskType[])[] = [];
    const workingSpinners = inject(WorkingSpinnersService);

    spinner.show('getListsAndTasks');
    workingSpinners.spinnerStartsWorking('getListsAndTasks');
    return inject(ListService).getLists()
    .pipe(
      switchMap((listsArray: ListType[]) => {
        arrayOfListsAndTasks.push(listsArray);
        return taskService.getTasks(listId)
      }),
      map((tasksArray: TaskType[]) => {
        arrayOfListsAndTasks.push(tasksArray);
        console.log(arrayOfListsAndTasks);
        return arrayOfListsAndTasks
      }),
      catchError((error: ErrorBodyType) => {
        router.navigateByUrl('');
        toastr.error(error.message);
        return [];
      }),
      finalize(() => {
        // setTimeout(() => {
          console.log('time finalize works')
          spinner.hide('getListsAndTasks');
          workingSpinners.spinnerFinishesWorking('getListsAndTasks');
        // }, 2000);

      })
    )
  }

export const routes: Routes = [
  { path: '', redirectTo: 'homePage/lists', pathMatch: 'full' },

  {
    path: 'homePage/lists/:listId',
    component: HomePageComponent,
    resolve : {
      'listsAndTasksArray' : listsAndTasksResolver,
    }
  },
  {
    path: 'homePage/lists',
    component: HomePageComponent,
    resolve : { 'lists' : listsResolver }
  },

  { path: 'lists/:listId/editList', component: EditListComponent },
  { path: 'lists/:listId/tasks/:taskId/editTask', component: EditTaskComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'newList', component: NewListComponent },

  { path: 'lists/:listId/newTask', component: NewTaskComponent },

  { path: '**', component: NotFoundComponent },

];
