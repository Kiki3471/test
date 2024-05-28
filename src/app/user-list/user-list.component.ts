import {Component, EventEmitter, Output, inject} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgFor} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UsersService } from '../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

/**
 * @title Basic checkboxes
 */
@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss'],
  standalone: true,
  imports: [
    MatCheckboxModule, 
    FormsModule,
    CommonModule,
    UserCardComponent
  ],
})
export class UserListComponent {
  private readonly userService = inject(UsersService);
  public readonly users$ = this.userService.users$;
  
  constructor(){
    this.userService.getAllUsers();
  }

}









