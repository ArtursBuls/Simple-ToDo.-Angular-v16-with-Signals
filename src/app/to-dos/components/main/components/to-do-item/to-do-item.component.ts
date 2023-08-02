import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToDosService } from 'src/app/services/to-dos.service';
import { ToDo } from 'src/app/types/to-do.interface';

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss'],
})
export class ToDoItemComponent {
  toDosService = inject(ToDosService);
  editableToDo = new FormControl<string | null>('');
  @Input({ required: true }) item!: ToDo;
  @Input({ required: true }) isEditing!: boolean;
  @Output() renderEditedToDo: EventEmitter<string | null> = new EventEmitter();

  @ViewChild('editInput') editInput?: ElementRef;

  enterEditMode() {
    this.editableToDo.setValue(this.item.title);
    this.renderEditedToDo.emit(this.item.id);
    setTimeout(() => {
      this.editInput?.nativeElement.focus();
    }, 0); //TODO!Set timeout to wait while component('editInput') will be rendered;
  }

  editItem() {
    this.toDosService.editToDo(this.item.id, this.editableToDo.value ? this.editableToDo.value : this.item.title);
    this.renderEditedToDo.emit(null);
  }

  deleteItem() {
    this.toDosService.deleteToDo(this.item.id);
  }

  closeEditMode() {
    this.renderEditedToDo.emit(null);
  }

  toggleIsCompleted() {
    this.toDosService.toggleToDo(this.item.id);
  }
}
