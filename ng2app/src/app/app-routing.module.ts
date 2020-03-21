import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TodoListComponent} from './components/todo-list.component';

const routes: Routes = [
  //TodoListComponentへ向けてルーティング
  {path:'', component: TodoListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
