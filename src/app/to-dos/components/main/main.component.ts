import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToDosService } from 'src/app/services/to-dos.service';
import { ToDoItemComponent } from './components/to-do-item/to-do-item.component';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToDo } from 'src/app/types/to-do.interface';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ToDoItemComponent, MatCheckboxModule, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  toDosService = inject(ToDosService);
  editingId: string | null = null;

  setEditingId(editingId: string | null) {
    this.editingId = editingId;
  }

  dragDrop(event: CdkDragDrop<ToDo[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
