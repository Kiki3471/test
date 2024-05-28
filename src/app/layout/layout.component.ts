import { Component, DestroyRef, inject } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../services/user.service';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    UserListComponent,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ]
})
export class LayoutComponent {
  private readonly service = inject(UsersService)
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  get marker(){
    return this.service.mark
  }

  public addUser(){
    this.dialog.open(CreateEditUserComponent, {
      data: {
        title: 'Новый клиент'
      },
    }).afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((newUser: User) =>{
          if(newUser){
            this.service.addNewUsers(newUser)
          }
        })
  }

  change(mark: boolean){    
    this.service.chengeMark(mark)
  }

  deleteUsers(){   
    this.service.deletUsers() 
  }

}

