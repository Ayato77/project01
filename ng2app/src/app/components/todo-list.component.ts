import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {TodoService} from '../services/todo.service';
import { Todo } from '../models/todo.model';

//デコレーター（アノテーション）
@Component({
  selector: 'todo-list',
  templateUrl: '../templates/todo-list.component.html',
  styleUrls: ['../static/todo-list.component.css']
})

export class TodoListComponent implements OnInit{
  todos: Todo[] = [];
  newtodos: Todo[] = [];
  @Input() todo: Todo = new Todo();
  @Input() isEdit = false;
  @Input() hideElement = false;

  constructor(
    private todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this.todoService.getAllTodo().subscribe(todos => {this.todos = todos});
  }

  //保存ボタンを押した時
  save(): void{
    this.todoService
      .create(this.todo)
      .subscribe(data => {this.getNewTodo()});
    this.todo = new Todo();
  }

  //get one new todo
  getNewTodo(): void {
    this.todoService
      .getNewTodo()
      .subscribe(res =>{this.pushData(res)});
  }

  pushData(data: Todo): void{
    this.newtodos.unshift(data);
  }

  // 削除ボタンの動作
  delete(id): void{
    this.todoService
      .delete(id)
      .subscribe();//subscribe()を呼ばないとdeleteが実行されない
  }

  // todoを更新した時の動作
  update(id: number, title: string): void {
    let todo = {
      id: id,
      title: title
    }
    this.todoService.updateTodo(todo).subscribe();
  }
}
