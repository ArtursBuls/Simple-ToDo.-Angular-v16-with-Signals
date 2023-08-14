import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { ToDosService } from 'src/app/services/to-dos.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FilterEnum } from 'src/app/types/filter.enum';

describe('FooterComponent', () => {
  let footer: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let toDosService: ToDosService;
  let el: DebugElement;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [FooterComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FooterComponent);
        el = fixture.debugElement;
        footer = el.componentInstance;
        toDosService = TestBed.inject(ToDosService);
        toDosService.addToDo('This is a new toDo one title');
        toDosService.addToDo('This is a new toDo two title');
        toDosService.addToDo('This is a new toDo three title');
      })));

  it('should create the "FooterComponent"', () => {
    expect(footer).toBeTruthy();
  });

  it('should call setFilter() method on button "All" click', fakeAsync(() => {
    const spy = spyOn(footer, 'setFilter');
    fixture.detectChanges();
    const button = el.query(By.css('.button-all'));
    button.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  }));

  it('should call setFilter() method from service by calling setFilter() on button "All" click', fakeAsync(() => {
    const spy = spyOn(toDosService, 'setFilter');
    fixture.detectChanges();
    const button = el.query(By.css('.button-all'));
    button.nativeElement.click();
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should set filterSignal value as "FilterEnum.ALL" by calling setFilter() on button "All" click', fakeAsync(() => {
    fixture.detectChanges();
    const button = el.query(By.css('.button-all'));
    button.nativeElement.click();
    const filterValueAfterClick = toDosService.filterSignal();
    expect(filterValueAfterClick).toBe(FilterEnum.ALL);
  }));

  it('should set filterSignal value as "FilterEnum.ACTIVE" by calling setFilter() on button "Active" click', fakeAsync(() => {
    fixture.detectChanges();
    const button = el.query(By.css('.button-active'));
    button.nativeElement.click();
    const filterValueAfterClick = toDosService.filterSignal();
    expect(filterValueAfterClick).toBe(FilterEnum.ACTIVE);
  }));

  it('should set filterSignal value as "FilterEnum.COMPLETED" by calling setFilter() on button "Completed" click', fakeAsync(() => {
    fixture.detectChanges();
    const button = el.query(By.css('.button-completed'));
    button.nativeElement.click();
    const filterValueAfterClick = toDosService.filterSignal();
    expect(filterValueAfterClick).toBe(FilterEnum.COMPLETED);
  }));

  it('should call setFilter() method on button "Active" click', fakeAsync(() => {
    const spy = spyOn(footer, 'setFilter');
    fixture.detectChanges();
    const button = el.query(By.css('.button-active'));
    button.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  }));

  it('should call setFilter() method on button "Completed" click', fakeAsync(() => {
    const spy = spyOn(footer, 'setFilter');
    fixture.detectChanges();
    const button = el.query(By.css('.button-completed'));
    button.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  }));
});
