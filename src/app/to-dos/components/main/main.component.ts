import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { ToDosService } from 'src/app/services/to-dos.service';
import { FilterEnum } from 'src/app/types/filter.enum';
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

  filteredToDos = computed(() => {
    const toDos = this.toDosService.toDosSignal();
    const filter = this.toDosService.filterSignal();

    if (filter === FilterEnum.ACTIVE) {
      return toDos.filter(item => !item.isCompleted);
    } else if (filter === FilterEnum.COMPLETED) {
      return toDos.filter(item => item.isCompleted);
    }
    return toDos;
  });

  isAllItemsChecked = computed(() => this.toDosService.toDosSignal().every(todo => todo.isCompleted));

  setEditingId(editingId: string | null) {
    this.editingId = editingId;
  }

  selectAll(event: MatCheckboxChange): void {
    this.toDosService.toggleAllToDos(event.checked);
  }
}
