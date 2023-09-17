import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Observable, finalize, map, switchMap } from "rxjs";
import { ListType } from "src/app/shared/types/listType";
import { TaskType } from "src/app/shared/types/taskType";
import { ListService } from "../lists/list.service";
import { WorkingSpinnersService } from "../spinners-state/working-spinner.service";
import { TaskService } from "../tasks/task.service";

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
      finalize(() => {
        // setTimeout(() => {
          console.log('time finalize works')
          spinner.hide('getListsAndTasks');
          workingSpinners.spinnerFinishesWorking('getListsAndTasks');
        // }, 2000);

      })
    )
  }
