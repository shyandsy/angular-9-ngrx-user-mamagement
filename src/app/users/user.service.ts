import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Response } from './../app.models';
import { User, } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private usersUrl = "http://localhost:8000/user";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Response<User[]>> {
    console.log("user service: Get Users")
    return this.http.get<Response<User[]>>(this.usersUrl, 
      //{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
    );
  }

  getUserById(payload: number): Observable<Response<User>> {
    console.log("user service: Get User By Id")
    return this.http.get<Response<User>>(`${this.usersUrl}/${payload}`, 
      //{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
    );
  }

  createUser(payload: User): Observable<Response<User>> {
    console.log("user service: Create User")
    console.log(payload)
    return this.http.post<Response<User>>(this.usersUrl, 
      payload, 
      //{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
    );
  }

  updateUser(user: User): Observable<Response<User>> {
    console.log("user service: Update User")
    return this.http.patch<Response<User>>(
      `${this.usersUrl}/${user.id}`,
      user,
      //{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
    );
  }

  deleteUser(payload: number) {
    console.log("user service: Delete User")
    return this.http.delete(`${this.usersUrl}/${payload}`, 
      //{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
    );
  }
}