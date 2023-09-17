import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { ErrorBodyType } from '../types/errorBodyResponse';

export const lastErrorHandlerFun = (
  error: ErrorBodyType, router: Router, toastr: ToastrService
): string | undefined => {
  if(error.shouldNavigate) {
    router.navigateByUrl('/homePage/lists');
    toastr.error(error.message, 'Error');
    return;
  }
  return error.message;
}
