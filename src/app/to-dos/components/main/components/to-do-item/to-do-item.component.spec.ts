import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { ToDosService } from 'src/app/services/to-dos.service';
import { ToDoItemComponent } from './to-do-item.component';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ToDoItemComponent', () => {
  let toDoItem: ToDoItemComponent;
  let fixture: ComponentFixture<ToDoItemComponent>;
  let toDosService: ToDosService;
  let el: DebugElement;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [ToDoItemComponent],
      providers: [provideAnimations()],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ToDoItemComponent);
        el = fixture.debugElement;
        toDoItem = el.componentInstance;
        toDosService = TestBed.inject(ToDosService);
        toDosService.addToDo('This is a new toDo one title');
        toDosService.addToDo('This is a new toDo two title');
      })));

  it('should create the "ToDoItemComponent"', () => {
    expect(toDoItem).toBeTruthy();
  });

  it('should render toDos title', () => {
    //Should set a component input ('item') value first to get access to element with ngIf directive on it!;
    toDoItem.item = toDosService.filteredToDos()[0];
    //And push angular to detect changes after!;
    fixture.detectChanges();
    const element = el.query(By.css('#itemTitle')).nativeElement;
    expect(element.textContent).toBe(toDoItem.item.title);
  });

  it('should call deleteItem() method on button click', fakeAsync(() => {
    spyOn(toDoItem, 'deleteItem');
    let button = el.query(By.css('.delete-button')).nativeElement;
    button.click();
    tick();
    expect(toDoItem.deleteItem).toHaveBeenCalled();
  }));

  it('should call deleteToDo() method from service by calling deleteItem() method on button click', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[1];
    spyOn(toDosService, 'deleteToDo');
    let button = el.query(By.css('.delete-button')).nativeElement;
    button.click();
    tick();
    expect(toDosService.deleteToDo).toHaveBeenCalledTimes(1);
  }));

  it('should call toggleIsCompleted() method on checking/unchecking checkbox', fakeAsync(() => {
    spyOn(toDoItem, 'toggleIsCompleted');
    let checkbox = el.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('change');
    tick();
    expect(toDoItem.toggleIsCompleted).toHaveBeenCalled();
  }));

  it('should call toggleToDo() method from service by calling toggleIsCompleted() method on checking/unchecking checkbox', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[1];
    spyOn(toDosService, 'toggleToDo');
    let checkbox = el.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('change');
    tick();
    expect(toDosService.toggleToDo).toHaveBeenCalledTimes(1);
  }));

  it('should call closeEditMode() method on button click', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[0];
    toDoItem.isEditing = true;
    fixture.detectChanges();
    spyOn(toDoItem, 'closeEditMode');
    let button = el.query(By.css('.close-edit-button')).nativeElement;
    button.click();
    tick();
    expect(toDoItem.closeEditMode).toHaveBeenCalled();
  }));

  it('should emit null event by calling closeEditMode() method on button click', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[1];
    toDoItem.isEditing = true;
    fixture.detectChanges();
    const spy = spyOn(toDoItem.renderEditedToDo, 'emit');
    let button = el.query(By.css('.close-edit-button')).nativeElement;
    button.click();
    tick();
    expect(spy).toHaveBeenCalledWith(null);
  }));
});
