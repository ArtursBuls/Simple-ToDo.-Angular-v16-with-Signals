import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ToDosComponent } from './to-dos/to-dos.component';

@NgModule({
  declarations: [AppComponent],
  imports: [ ToDosComponent, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
