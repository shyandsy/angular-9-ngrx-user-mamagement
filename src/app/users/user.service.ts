import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Response } from './../app.models';
import { User, } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private customersUrl = "http://localhost:8000/user";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Response<User[]>> {
    return this.http.get<Response<User[]>>(this.customersUrl);
  }

  getUserById(payload: number): Observable<User> {
    return this.http.get<User>(`${this.customersUrl}/${payload}`);
  }

  createUser(payload: User): Observable<User> {
    return this.http.post<User>(this.customersUrl, payload);
  }

  updateUser(customer: User): Observable<User> {
    return this.http.patch<User>(
      `${this.customersUrl}/${customer.id}`,
      customer
    );
  }

  deleteCustomer(payload: number) {
    return this.http.delete(`${this.customersUrl}/${payload}`);
  }
}