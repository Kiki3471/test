import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserLoacalService{
    set setUsersLocal(users: User[]){        
        window.localStorage.setItem('users', JSON.stringify({users: users}));
    }

    get getUsersLocal(): {users: User[]}{
        return JSON.parse(window.localStorage.getItem('users')!)
    }
}