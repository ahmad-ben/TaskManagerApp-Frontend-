import { inject, Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { MockService } from './../mockSer';

@Injectable({
  providedIn: "root"
})

export class ListsResolveService implements Resolve<any>{

  mockService = inject(MockService);

  resolve() {
    console.log('Resolve works');

    return this.mockService.getLate().then((data) => {
      console.log('this is the data', data);
      return data
    })

  }

}
