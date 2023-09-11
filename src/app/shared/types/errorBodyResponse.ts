export interface ErrorBodyType {
  message: string,
  shouldNavigate?: boolean | 'log out';
  clientMessageShape?: 'message' | 'toastr';
  retry?: number;
}
