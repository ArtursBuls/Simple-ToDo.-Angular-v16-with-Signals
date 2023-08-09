import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ToDoItemComponent } from './to-do-item.component';

describe('ToDoItemComponent', () => {
  let toDoItem: ToDoItemComponent;
  let fixture: ComponentFixture<ToDoItemComponent>;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [ToDoItemComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ToDoItemComponent);
        toDoItem = fixture.debugElement.componentInstance;
      })));

  it('should create the "ToDoItemComponent"', () => {
    expect(toDoItem).toBeTruthy();
  });
});
