import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';

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
    return this.http.get(this.host, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  //新しいtodoを追加する
  create(todo: Todo): Observable<any>{
    return this.http.post(this.host, JSON.stringify(todo),{headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  //Todoの削除
  delete(id: number): Observable<{}> {
    const url = `${this.host}${id}/`;
    return this.http
      .delete(url, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  updateTodo(todo: Todo): Observable<any>{
    return this.http.put(this.host, todo, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  //Error handler
  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      //If a client-side or network error occurred, throw following error message
      console.error('An client/network error occured:', error.error.message);
    }
    else{
      // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
      console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
    }
     // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
