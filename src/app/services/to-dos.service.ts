import { Injectable, signal } from '@angular/core';
import { ToDo } from '../types/to-do.interface';
import { FilterEnum } from '../types/filter.enum';

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
    this.toDosSignal.update(item => [...item, newToDo]);
  }

  setFilter(filterValue: FilterEnum) {
    this.filterSignal.set(filterValue);
  }
}
