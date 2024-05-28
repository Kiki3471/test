import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { UsersApiService } from './user.api.service';
import { User } from '../interfaces/user.interface';
import { UserLoacalService } from './user.local.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly userLocalService = inject(UserLoacalService);
  private readonly usersApiService = inject(UsersApiService);
  private readonly userStateSubject = new BehaviorSubject<{users: User[]}>({users: []});
  public readonly users$: Observable<{users: User[]}> = this.userStateSubject.asObservable();
  public mark = false;
  private checkedUsers: User[] = [];

  get getUsers(){
      return this.userStateSubject.getValue()
  }

  set setNewUsers(users: User[]){
    this.userLocalService.setUsersLocal = users
    this.userStateSubject.next({users: users})
  }

  public chengeMark(mainMark: boolean){
    this.mark = mainMark;
    if(mainMark){
      this.checkedUsers = this.getUsers.users;
    } else{this.checkedUsers = []}
  }

  public chegeMarkUserCard(user: User){
    if(this.checkedUsers.includes(user)){
      this.checkedUsers = this.checkedUsers.filter(item => item !== user)
    }else{
      this.checkedUsers.push(user)
    }
  }


  public getAllUsers(){
    if(this.userLocalService.getUsersLocal.users.length === 0){
      this.usersApiService.getUsers()
        .subscribe(
          {
            next: (serverUsers: {users: User[]}) => {
              this.setNewUsers = serverUsers.users
            }
          })
      }else{
        this.setNewUsers = this.userLocalService.getUsersLocal.users
      }
  }

  public addNewUsers(newUser: User){
    const newUsers = [...this.getUsers.users, newUser]
    this.setNewUsers = newUsers    
  }

  public editUser(editedUser: User, oldUser: User){    
    const newUsers = this.getUsers.users.map(user => {
        if(user === oldUser) return editedUser
        else return user
      })
      this.setNewUsers = newUsers
  }

  public deletUsers(){
    this.mark = false
    this.setNewUsers = this.getUsers.users.filter(user => !this.checkedUsers.includes(user));
  }
}
