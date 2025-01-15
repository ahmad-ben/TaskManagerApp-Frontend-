import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, catchError, finalize, map, of, switchMap } from "rxjs";
import { ListType } from "src/app/shared/types/listType";
import { TaskType } from "src/app/shared/types/taskType";
import { ListService } from "../lists/list.service";
import { TaskService } from "../tasks/task.service";

export const listsAndTasksResolver: ResolveFn<Observable<(ListType[] | TaskType[])[]>> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {

    const taskService = inject(TaskService);
    const listId = route.params['listId'];
    const arrayOfListsAndTasks : (ListType[] | TaskType[])[] = [];

    return inject(ListService).getLists()
    .pipe(
      switchMap((listsArray: ListType[]) => {
        arrayOfListsAndTasks.push(listsArray);
        return taskService.getTasks(listId)
      }),
      map((tasksArray: TaskType[]) => {
        arrayOfListsAndTasks.push(tasksArray);
        return arrayOfListsAndTasks
      }),
      catchError(() => of(arrayOfListsAndTasks))
    )
}
