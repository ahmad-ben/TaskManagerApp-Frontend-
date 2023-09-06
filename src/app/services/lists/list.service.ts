import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ListType } from 'src/app/shared/types/listType';
import { WebRequestService } from './../web/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  webReqService = inject(WebRequestService);

  getLists(){
    return this.webReqService.get('lists') as Observable<ListType[]>;
  }

  createList(listTitle: string): Observable<ListType>{
    const payload = { title: listTitle }
    return this.webReqService.post('lists', payload) as Observable<ListType>;
  }

  editList(listId: string, listTitle: string){
    return this.webReqService.patch(`lists/${listId}`, { title: listTitle });
  }

  deleteList(listId: string){
    return this.webReqService.delete(`lists/${listId}`);
  }

}
