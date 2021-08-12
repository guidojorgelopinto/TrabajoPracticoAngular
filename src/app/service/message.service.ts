import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostsI } from '../models/posts.interface';
import { BehaviorSubject, Observable, pipe, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  [x: string]: any;
  private loggedIn = new BehaviorSubject<boolean>(false);

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public bring() {
    return this.http.get<PostsI[]>(`${this.URL}/api/posts/`);
  }

  delete(id:any): Observable<any> {
    return this.http.delete(`${this.URL}/api/posts/id`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.URL}/api/posts/`);
  }

   //Enviar mensaje nuevo

   sendMessage(authData: PostsI) {
    return this.http
    .post<PostsI>(`${this.URL}/api/posts/`, authData)
    .subscribe((res: PostsI) => {
      console.log(res);
      // this.saveToken(res.token);
      // this.loggedIn.next(true);
      // return res;
    });
      // catchError((err) => this.handleError(err))
  }


  private checkToken(): void {

    const serializableState: string | any = localStorage.getItem('globalState');
    return serializableState !== null || serializableState === undefined ? JSON.parse(serializableState) : undefined;
  }

  private saveToken(token: string): void {
    localStorage.setItem("token", token);
  }


  // getAll(): Observable<any> {
  //   return this.http.get(this.URL);
  // }

  // get(id): Observable<any> {
  //   return this.http.get(`${this.URL}/${id}`);
  // }

  // create(data): Observable<any> {
  //   return this.http.post(this.URL, data);
  // }

  // update(id, data): Observable<any> {
  //   return this.http.put(`${this.URL}/${id}`, data);
  // }

  // findByTitle(title): Observable<any> {
  //   return this.http.get(`${this.URL}?title=${title}`);
  // }
// }

  }
