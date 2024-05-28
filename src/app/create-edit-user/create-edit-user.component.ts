import { Component, inject } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss'],
  imports: [
    CommonModule,
    FormsModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class CreateEditUserComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef);
  public data: {title: string, user?: User} = inject(MAT_DIALOG_DATA);
  
  public readonly formGroup = this.formBuilder.nonNullable.group({
    name: [this.data.user?.name, [Validators.required, Validators.minLength(2)]],
    surname: [this.data.user?.surname, [Validators.required, Validators.minLength(2)]],
    email: [this.data.user?.email, [Validators.required, Validators.email]],
    phone: [this.data.user?.phone, [Validators.maxLength(12),Validators.minLength(12), Validators.pattern(/\+79[0-9]{7}/)]],
  });

  close(){
    this.dialogRef.close()
  }

  save(){
    this.dialogRef.close(this.formGroup.getRawValue())
  }

}
