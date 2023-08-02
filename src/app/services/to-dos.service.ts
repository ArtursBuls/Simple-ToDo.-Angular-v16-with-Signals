import { Injectable, signal } from '@angular/core';
import { FilterEnum } from '../types/filter.enum';
import { ToDo } from '../types/to-do.interface';

@Injectable({
  providedIn: 'root',
})
export class ToDosService {
  toDosSignal = signal<ToDo[]>([]);
  filterSignal = signal<FilterEnum>(FilterEnum.ALL);

  addToDo(text: string) {
    const newToDo: ToDo = {
      id: Math.floor(Math.random() * 100).toString(), //TODO! Should think about better unique id implementation :-);
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
}
