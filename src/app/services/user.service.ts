import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, from, of, filter} from "rxjs";
import {UserData} from "../models/user-data";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users : UserData[] = [];
  private readonly url: string = 'https://random-data-api.com/api/v2/users?size=30'

  constructor(private http: HttpClient) { }

  public getUserData(): Observable<UserData[]>{
    if(this.users.length){
      return of(this.users);
    }
    return this.getAndSaveUsers();
  }

  public getUserById(id: number): Observable<UserData | undefined> {
    if(!this.users.length) {
      let users = localStorage.getItem('users')
      if(!users){
        return of(undefined);
      }
      this.users = JSON.parse(users) as UserData[];
    }
    return of(this.users.find(user => user.id = id));
  }

  private getAndSaveUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.url)
        .pipe(
          map((users) => {
            localStorage.setItem('users', JSON.stringify(users));
            this.users = users;
            return users;
          })
        );
  }


}
