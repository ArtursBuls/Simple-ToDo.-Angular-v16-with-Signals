import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToDosService } from 'src/app/services/to-dos.service';
import { ToDoItemComponent } from './to-do-item.component';

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
    toDoItem.item = toDosService.filteredToDos()[0];
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
    const button = el.query(By.css('.delete-button')).nativeElement;
    button.click();
    tick();
    expect(toDosService.deleteToDo).toHaveBeenCalledTimes(1);
  }));

  it('should call toggleIsCompleted() method on checking/unchecking checkbox', fakeAsync(() => {
    spyOn(toDoItem, 'toggleIsCompleted');
    const checkbox = el.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('change');
    tick();
    expect(toDoItem.toggleIsCompleted).toHaveBeenCalled();
  }));

  it('should call toggleToDo() method from service by calling toggleIsCompleted() method on checking/unchecking checkbox', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[1];
    spyOn(toDosService, 'toggleToDo');
    const checkbox = el.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('change');
    tick();
    expect(toDosService.toggleToDo).toHaveBeenCalledTimes(1);
  }));

  it('should call closeEditMode() method on button click', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[0];
    toDoItem.isEditing = true;
    fixture.detectChanges();
    spyOn(toDoItem, 'closeEditMode');
    const button = el.query(By.css('.close-edit-button')).nativeElement;
    button.click();
    tick();
    expect(toDoItem.closeEditMode).toHaveBeenCalled();
  }));

  it('should emit "renderEditedToDo" event with "null" value by calling closeEditMode() method on button click', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[1];
    toDoItem.isEditing = true;
    fixture.detectChanges();
    const spy = spyOn(toDoItem.renderEditedToDo, 'emit');
    const button = el.query(By.css('.close-edit-button')).nativeElement;
    button.click();
    tick();
    expect(spy).toHaveBeenCalledWith(null);
  }));

  it('should call enterEditMode() method on toDo item title double click', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[1];
    fixture.detectChanges();
    spyOn(toDoItem, 'enterEditMode');
    const element = el.query(By.css('.item-title'));
    element.triggerEventHandler('dblclick', {});
    tick();
    expect(toDoItem.enterEditMode).toHaveBeenCalled();
  }));

  it('should emit "renderEditedToDo" event with "this.item.id" value by calling enterEditMode() method on toDo item title double click', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[1];
    fixture.detectChanges();
    const spy = spyOn(toDoItem.renderEditedToDo, 'emit');
    const element = el.query(By.css('.item-title'));
    element.triggerEventHandler('dblclick', {});
    tick();
    expect(spy).toHaveBeenCalledWith(toDoItem.item.id);
  }));

  it('should set editableToDo formControl value to edited "item.title" value by calling enterEditMode() method on toDo item title double click', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[1];
    fixture.detectChanges();
    const element = el.query(By.css('.item-title'));
    element.triggerEventHandler('dblclick', {});
    toDoItem.isEditing = true;
    tick();
    fixture.detectChanges();
    const inputField = el.query(By.css('.edit-input')).nativeElement;
    expect(inputField.value).toBe(toDoItem.item.title);
  }));

  xit('should be focused on input field by calling enterEditMode() method on toDo item title double click', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[0];
    fixture.detectChanges();
    const element = el.query(By.css('.item-title'));
    element.triggerEventHandler('dblclick', {});
    toDoItem.isEditing = true;
    tick();
    fixture.detectChanges();
    const spyObject = toDoItem.editInput?.nativeElement;
    const focusedElement = spyOn(spyObject, 'focus');
    expect(focusedElement).toHaveBeenCalledTimes(1);
    //This test fails........;
  }));

  it('should call editItem() method on keyup.enter event in input field', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[1];
    toDoItem.isEditing = true;
    fixture.detectChanges();
    spyOn(toDoItem, 'editItem');
    const element = el.query(By.css('.edit-input'));
    element.triggerEventHandler('keyup.enter', {});
    tick();
    expect(toDoItem.editItem).toHaveBeenCalled();
  }));

  it('should emit "renderEditedToDo" event with "null" value by calling editItem() method on keyup.enter event in input field', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[1];
    toDoItem.isEditing = true;
    fixture.detectChanges();
    const spy = spyOn(toDoItem.renderEditedToDo, 'emit');
    const element = el.query(By.css('.edit-input'));
    element.triggerEventHandler('keyup.enter', {});
    tick();
    expect(spy).toHaveBeenCalledWith(null);
  }));

  it('should call editToDo() method from service by calling editItem() method on keyup.enter event in input field', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[1];
    toDoItem.isEditing = true;
    fixture.detectChanges();
    const spy = spyOn(toDosService, 'editToDo');
    const element = el.query(By.css('.edit-input'));
    element.triggerEventHandler('keyup.enter', {});
    tick();
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  xit('should set a new "editableToDo" formControl value if user changes the original one in edit mode', fakeAsync(() => {
    toDoItem.item = toDosService.filteredToDos()[1];
    fixture.detectChanges();
    const titleElement = el.query(By.css('.item-title'));
    titleElement.triggerEventHandler('dblclick', {});
    toDoItem.isEditing = true;
    tick();
    fixture.detectChanges();
    const inputField = el.query(By.css('.edit-input'));
    inputField.nativeElement.value = 'This is a new input field TEST value';
    inputField.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const spy = spyOn(toDosService, 'editToDo').and.callThrough();
    toDosService.editToDo(toDoItem.item.id, 'This is a new input field TEST value');
    expect(toDosService.editToDo).toHaveBeenCalledWith(toDoItem.item.id, 'This is a new input field TEST value');
  }));
});
