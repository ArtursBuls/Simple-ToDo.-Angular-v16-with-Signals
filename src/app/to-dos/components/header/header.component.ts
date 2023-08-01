import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToDosService } from 'src/app/services/to-dos.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  newToDo = new FormControl<string>('');
  toDosService = inject(ToDosService);

  clearInput() {
    this.newToDo.setValue('');
  }

  addTodo() {
    const controlValue = this.newToDo.value;
    if (controlValue) {
      this.toDosService.addToDo(controlValue);
    }
    this.clearInput();
  }
}
