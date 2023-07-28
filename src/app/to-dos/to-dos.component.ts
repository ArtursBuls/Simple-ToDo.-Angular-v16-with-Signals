import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ToDoItemComponent } from './components/to-do-item/to-do-item.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-to-dos',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ToDoItemComponent, FooterComponent],
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.scss'],
})
export class ToDosComponent {}
