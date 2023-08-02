import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';

@Component({
  selector: 'app-to-dos',
  standalone: true,
  imports: [ HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.scss'],
})
export class ToDosComponent {}
