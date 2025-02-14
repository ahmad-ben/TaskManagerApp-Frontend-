import { ToastrService } from "ngx-toastr";

export function showSuccessToaster(
  component: {toastr: ToastrService},
  message: string, 
  title: string
){ component.toastr.success(message, title) }