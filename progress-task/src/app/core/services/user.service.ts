import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('http://my-json-server.typicode.com/yanmariomenev/Progress-Task/users');
  }
}
