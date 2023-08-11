import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToDosService } from 'src/app/services/to-dos.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let header: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let toDosService: ToDosService;
  let el: DebugElement;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideAnimations()],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        el = fixture.debugElement;
        header = el.componentInstance;
        toDosService = TestBed.inject(ToDosService);
        toDosService.addToDo('This is a new toDo one title');
        toDosService.addToDo('This is a new toDo two title');
        toDosService.addToDo('This is a new toDo three title');
      })));

  it('should create the "HeaderComponent"', () => {
    expect(header).toBeTruthy();
  });

  it('should return "isAllItemsChecked()" correct value', () => {
    toDosService.toggleAllToDos(true);
    const result = toDosService.toDosSignal().every(element => element.isCompleted);
    expect(result).toBeTrue();
  });

  it('should call clearInput() method on button click', fakeAsync(() => {
    const spy = spyOn(header, 'clearInput');
    header.newToDo.setValue('12345678');
    fixture.detectChanges();
    const button = el.query(By.css('button'));
    button.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  }));

  it('should set input value to an empty string by calling clearInput() method on button click', fakeAsync(() => {
    header.newToDo.setValue('12345678');
    fixture.detectChanges();
    const button = el.query(By.css('button'));
    button.nativeElement.click();
    const inputValue = el.query(By.css('.main-input')).nativeElement.value;
    expect(inputValue).toBe('');
  }));

  it('should call selectAll() method on checking/unchecking checkbox', fakeAsync(() => {
    const spy = spyOn(header, 'selectAll');
    fixture.detectChanges();
    const checkbox = el.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('change');
    tick();
    expect(header.selectAll).toHaveBeenCalled();
  }));

  xit('should expect argument from change event by calling selectAll() method on checking/unchecking checkbox', fakeAsync(() => {}));

  xit('should call toggleAllToDos() method from service by calling selectAll() method on checking/unchecking checkbox', fakeAsync(() => {}));

  xit('should call toggleToDo() method from service by calling toggleIsCompleted() method on checking/unchecking checkbox', fakeAsync(() => {
    spyOn(toDosService, 'toggleToDo');
    const checkbox = el.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('change');
    tick();
    expect(toDosService.toggleToDo).toHaveBeenCalledTimes(1);
  }));
});
