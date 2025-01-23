import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskType } from 'src/app/shared/types/taskType';
import { WebRequestService } from './../web/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  webReqService = inject(WebRequestService);

  getTasks(listId: string){
    return this.webReqService.get(`lists/${listId}/tasks`) as Observable<TaskType[]>;
  }

  getTask(listId: string, taskId:  string){
    return this.webReqService.get(`lists/${listId}/tasks/${taskId}`) as Observable<TaskType>;
  }

  createTask(listId: string, taskTitle: string): Observable<TaskType>{
    const payload = { title: taskTitle }
    return this.webReqService.post(`lists/${listId}/tasks`, payload) as Observable<TaskType>;
  }

  editTask(taskDocument: TaskType, newTitle?: string): Observable<TaskType>{
    const payload = { completed: taskDocument.completed, title: newTitle };
    return this.webReqService.patch(
      `lists/${taskDocument._listId}/tasks/${taskDocument._id}`,
      payload
    ) as Observable<TaskType>;
  }

  deleteAllTasks(listId: string){
    return this.webReqService.delete(`lists/${listId}/tasks`); //Lists go out?? A lot isn't?
  }

  deleteTask(taskDocument: TaskType){
    return this.webReqService.delete(`lists/${taskDocument._listId}/tasks/${taskDocument._id}`);
  }

}
