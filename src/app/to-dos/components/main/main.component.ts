import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToDosService } from 'src/app/services/to-dos.service';
import { ToDoItemComponent } from './components/to-do-item/to-do-item.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ToDoItemComponent, MatCheckboxModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  toDosService = inject(ToDosService);
  editingId: string | null = null;

  setEditingId(editingId: string | null) {
    this.editingId = editingId;
  }
}
