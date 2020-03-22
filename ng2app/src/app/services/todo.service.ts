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

  getAllTodo(): Observable<any> {
    return this.http.get(this.host, {headers: this.headers});
  }

  // 全てのtodoをGETする
  /*getAllTodo(): Promise<Todo[]> {
    return this.http
      .get(this.host, this.httpOptions)
      .toPromise()
      .then((res) => {
      // response の型は any ではなく class で型を定義した方が良いが
      // ここでは簡便さから any としておく

      // @angular/http では json() でパースする必要があったが､ @angular/common/http では不要となった
      //const response: any = res.json();
      const response: any = res;
      return response;
      })
      .catch(this.errorHandler);
  }

  private errorHandler(err) {
    console.log('Error occured.', err);
    return Promise.reject(err.message || err);
  }*/
}
