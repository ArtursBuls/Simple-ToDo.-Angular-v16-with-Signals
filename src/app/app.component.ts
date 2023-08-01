import { Component } from '@angular/core';
import { ToDosComponent } from './to-dos/to-dos.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ToDosComponent]
})
export class AppComponent {}
