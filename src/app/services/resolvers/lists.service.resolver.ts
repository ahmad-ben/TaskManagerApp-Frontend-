import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs";
import { ListService } from "../lists/list.service";
import { WorkingSpinnersService } from "../spinners-state/working-spinner.service";

export const listsResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const spinner = inject(NgxSpinnerService);
    const workingSpinners = inject(WorkingSpinnersService);

    spinner.show('getLists');
    workingSpinners.spinnerStartsWorking('getLists');
    return inject(ListService).getLists()
      .pipe(
        finalize(() => {
          spinner.hide('getLists');
          workingSpinners.spinnerFinishesWorking('getLists');
        })
      )

};
