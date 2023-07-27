import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-version-16-project';

  ngOnInit(): void {
    this.setTimeout();
  }

  setTimeout() {
    setTimeout(() => {
      console.log('TimeOut');
    }, 3333);
  }
}
