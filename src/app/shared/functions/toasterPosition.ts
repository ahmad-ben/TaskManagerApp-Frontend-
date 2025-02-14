export function toasterPosition(){
  if(window.innerWidth < 400) return 'toast-top-full-width';
  return 'toast-top-right';
}