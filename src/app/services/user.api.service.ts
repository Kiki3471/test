import { Injectable, inject } from "@angular/core"
import { Observable } from "rxjs"
import { HttpClient } from '@angular/common/http';
import { User } from "../interfaces/user.interface";


@Injectable({
    providedIn: 'root'
  })
  export class UsersApiService {
    private readonly http = inject(HttpClient)
    private readonly userUrl = 'https://test-data.directorix.cloud/task1'
  
    public getUsers(): Observable<{users: User[]}>{
      return this.http.get<{users: User[]}>(this.userUrl);
      
    }
  }