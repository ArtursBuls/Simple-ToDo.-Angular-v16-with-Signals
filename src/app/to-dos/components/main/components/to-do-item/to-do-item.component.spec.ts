import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ToDosService } from 'src/app/services/to-dos.service';
import { ToDoItemComponent } from './to-do-item.component';
import { By } from '@angular/platform-browser';

describe('ToDoItemComponent', () => {
  let toDoItem: ToDoItemComponent;
  let fixture: ComponentFixture<ToDoItemComponent>;
  let toDosService: ToDosService;
  let el: DebugElement;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [ToDoItemComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ToDoItemComponent);
        el = fixture.debugElement;
        toDoItem = el.componentInstance;
        toDosService = TestBed.inject(ToDosService);
        toDosService.addToDo('This is a new toDo one title');
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
});
