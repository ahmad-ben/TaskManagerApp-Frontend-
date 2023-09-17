import { Routes } from '@angular/router';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { listsAndTasksResolver } from './services/resolvers/lists&tasks.service.resolver';
import { listsResolver } from './services/resolvers/lists.service.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'homePage/lists', pathMatch: 'full' },

  {
    path: 'homePage/lists/:listId',
    component: HomePageComponent,
    resolve : {
      'listsAndTasksArray' : listsAndTasksResolver,
    }
  },

  {
    path: 'homePage/lists',
    component: HomePageComponent,
    resolve : { 'lists' : listsResolver }
  },

  { path: 'lists/:listId/editList', component: EditListComponent },
  { path: 'lists/:listId/tasks/:taskId/editTask', component: EditTaskComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'newList', component: NewListComponent },

  { path: 'lists/:listId/newTask', component: NewTaskComponent },

  { path: '**', component: NotFoundComponent },

];
