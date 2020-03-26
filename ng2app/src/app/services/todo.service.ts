import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Todo } from '../models/todo.model';
import {catchError} from 'rxjs/operators';


@Injectable()
export class TodoService {
  todo: Todo[] = [];
  private host = 'http://localhost:8000/api/todo/';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) {
  }
  //全てのtodoをgetする
  getAllTodo(): Observable<any> {
    return this.http.get(this.host, {headers: this.headers});
  }

  //新しいtodoを追加する
  create(todo: Todo): Observable<any>{
    return this.http.post(this.host, JSON.stringify(todo),{headers: this.headers});
  }

  //Todoの削除
  delete(id: number): Observable<{}> {
    const url = `${this.host}${id}/`;
    return this.http
      .delete(url, {headers: this.headers});
  }

  updateTodo(todo: Todo): Observable<any>{
    return this.http.put(this.host, todo, {headers: this.headers});
  }
}
