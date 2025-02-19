export function toasterPosition(){
  if(window.innerWidth < 450) return 'toast-top-full-width';
  return 'toast-top-right';
}