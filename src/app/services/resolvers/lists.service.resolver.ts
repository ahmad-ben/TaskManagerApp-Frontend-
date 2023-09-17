import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { catchError, finalize } from "rxjs";
import { ErrorBodyType } from "src/app/shared/types/errorBodyResponse";
import { ListService } from "../lists/list.service";
import { WorkingSpinnersService } from "../spinners-state/working-spinner.service";

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
