import { Component, Signal, WritableSignal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ToDosService } from 'src/app/services/to-dos.service';
import { FilterEnum } from 'src/app/types/filter.enum';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  toDosService: ToDosService = inject(ToDosService);
  filterSignal: WritableSignal<FilterEnum> = this.toDosService.filterSignal;
  filterEnum = FilterEnum;
  activeItems: Signal<number> = computed(
    () => this.toDosService.toDosSignal().filter(element => !element.isCompleted).length,
  );
  noToDos: Signal<boolean> = computed(() => !!this.toDosService.toDosSignal().length);
  itemsLeft: Signal<string> = computed(() => `item${this.activeItems() !== 1 ? 's' : ''} left`);

  setFilter(filterValue: FilterEnum) {
    this.toDosService.setFilter(filterValue);
  }
}
