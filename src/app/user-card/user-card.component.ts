import { Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../services/user.service';

@Component({
  standalone: true,
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  imports: [
    MatCheckboxModule, 
    FormsModule,
  ]
})
export class UserCardComponent {
  @Input({required: true}) user!: any;  
  private readonly service = inject(UsersService)
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  get marker(){
    return this.service.mark
  }

  public editUser(){
    this.dialog.open(CreateEditUserComponent, {
      data: {
        title: 'Редактирование',
        user: this.user
      }
    }).afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((newUser: User) =>{
          if(newUser){
            this.service.editUser(newUser, this.user)
          }
        })
  }

  change(){
    this.service.chegeMarkUserCard(this.user)    
  }

}
