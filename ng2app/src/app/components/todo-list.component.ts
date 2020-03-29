import {Component, Input, OnInit} from '@angular/core';

import {TodoService} from '../services/todo.service';
import { Todo } from '../models/todo.model';

//デコレーター（アノテーション）
@Component({
  selector: 'todo-list',
  templateUrl: '../templates/todo-list.component.html',
  styleUrls: ['../static/todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  updatedtodos: Todo[];
  @Input() todo: Todo = new Todo();
  @Input() isEdit = false;
  @Input() hideElement = false;
  btnText = '';

  constructor(
    private todoService: TodoService,
  ) {
  }
//最初のイニシャライズ。ngOnChangeよりは後に呼び出される
  ngOnInit(): void {
    this.todoService.getAllTodo().subscribe(todos => {
      this.todos = todos
    });
  }

  //保存ボタンを押した時に発火。無事に新しいtodoをpostできたら、返値をtodosの先頭に追加する。
  save(): void {
    this.todoService
      .create(this.todo)
      .subscribe(data => {
        this.todos.unshift(data)
      });
    this.todo = new Todo();
  }
  // 削除ボタンの動作
  delete(data:Todo): void {
    this.todoService
      .delete(data.id)
      .subscribe();//subscribe()を呼ばないとdeleteが実行されない
    this.updatedtodos=[];
    this.updatedtodos = this.todos.filter(elm => {return elm !== data});
    this.todos=[];
    this.todos = this.updatedtodos.concat();
  }
  //完了したアイテムのみを削除
  deleteDoneItems(){
    for(let item of this.todos.filter(elm => {return elm.status})){
      this.delete(item);
    }
  }
  //リストを全削除
  resetTodo(){
    const conf = window.confirm('Do you really want to reset the list?');
    if(conf){
      for(let item of this.todos){
      this.delete(item);
    }
    this.todos = [];
    }
  }

  // todoを更新した時の動作
  update(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe();
  }

  // Toggle todo status
  toggleTodoStatus(todo: Todo) {
    todo.status = !todo.status;
    this.todoService.updateTodo(todo).subscribe();
  }

  getBtnText(todo: Todo){
    if(todo.status){
      return ' DONE ';
    }
    else{
      return 'unfinished';
    }
  }
//TrackByを使って、*ngForで再度ロードされるhtmlを少なくする。
  myTrackBy(index: number, obj: any): any {
    return index;
  }
}
