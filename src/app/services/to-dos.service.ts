import { Injectable, computed, signal } from '@angular/core';
import { FilterEnum } from '../types/filter.enum';
import { ToDo } from '../types/to-do.interface';

@Injectable({
  providedIn: 'root',
})
export class ToDosService {
  toDosSignal = signal<ToDo[]>([]);
  filterSignal = signal<FilterEnum>(FilterEnum.ALL);

  filteredToDos = computed(() => {
    const toDos = this.toDosSignal();
    const filter = this.filterSignal();

    if (filter === FilterEnum.ACTIVE) {
      return toDos.filter(item => !item.isCompleted);
    } else if (filter === FilterEnum.COMPLETED) {
      return toDos.filter(item => item.isCompleted);
    }
    return toDos;
  });

  addToDo(text: string) {
    const newToDo: ToDo = {
      id: this.generateRandomId(),
      title: text,
      isCompleted: false,
    };
    this.toDosSignal.update(items => [...items, newToDo]);
  }

  editToDo(id: string, title: string) {
    this.toDosSignal.update(items => items.map(element => (element.id === id ? { ...element, title } : element)));
  }

  deleteToDo(id: string) {
    this.toDosSignal.update(items => items.filter(element => element.id !== id));
  }

  toggleToDo(id: string) {
    this.toDosSignal.update(items =>
      items.map(element => (element.id === id ? { ...element, isCompleted: !element.isCompleted } : element)),
    );
  }

  toggleAllToDos(isCompleted: boolean): void {
    this.toDosSignal.update(items => items.map(element => ({ ...element, isCompleted })));
  }

  setFilter(filterValue: FilterEnum) {
    this.filterSignal.set(filterValue);
  }

  deleteCompletedToDos() {
    this.toDosSignal.update(items => items.filter(element => !element.isCompleted));
  }

  //TODO! Should think about better unique id implementation :-);
  private generateRandomId(): string {
    const randomString = Math.random().toString(36).substring(2);
    const timestamp = Date.now().toString(36);
    return randomString + timestamp;
  }
}
