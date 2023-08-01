import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDo } from 'src/app/types/to-do.interface';

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss'],
})
export class ToDoItemComponent {
  @Input({ required: true }) item!: ToDo;

  editItem(id: string) {
    console.log(id);

  }
}
