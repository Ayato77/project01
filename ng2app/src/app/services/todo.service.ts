import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Todo } from '../models/todo.model';


@Injectable()
export class TodoService {
  todo: Todo[] = [];
  private host = 'http://localhost:8000/api/todo/';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) {
  }
  //全てのtodoを渡す
  getAllTodo(): Observable<any> {
    return this.http.get(this.host, {headers: this.headers});
  }

  //新しいtodoを追加する
  create(todo: Todo): Observable<any>{
    return this.http.post(this.host, JSON.stringify(todo),{headers: this.headers});
  }
  //追加された最新のtodoを一件取得
  getNewTodo(): Observable<any>{
    return this.http
      .get(this.host+"?limit=1");
  }
}
