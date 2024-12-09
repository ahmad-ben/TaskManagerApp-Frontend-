export function toasterPosition(){
  if(window.innerWidth < 640) return 'toast-top-full-width';
  return 'toast-top-right';
}
