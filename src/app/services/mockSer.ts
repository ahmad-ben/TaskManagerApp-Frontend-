import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class MockService  {

  getLate() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res('now it happen')
      }, 10000);
    })
  }

}


