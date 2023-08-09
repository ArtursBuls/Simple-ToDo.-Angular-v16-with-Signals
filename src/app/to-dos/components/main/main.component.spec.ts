import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ToDosService } from 'src/app/services/to-dos.service';
import { MainComponent } from './main.component';
import { By } from '@angular/platform-browser';
import { ToDoItemComponent } from './components/to-do-item/to-do-item.component';

describe('MainComponent', () => {
  let main: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let toDosService: ToDosService;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [MainComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MainComponent);
        main = fixture.debugElement.componentInstance;
        toDosService = TestBed.inject(ToDosService);
        toDosService.addToDo('This is a new toDo one');
        toDosService.addToDo('This is a new toDo two');
        toDosService.addToDo('This is a new toDo three');
        toDosService.addToDo('This is a new toDo four');
        toDosService.addToDo('This is a new toDo five');
        fixture.detectChanges();
      })));

  it('should create', () => {
    expect(main).toBeTruthy();
  });

  it('should set editingId correctly', () => {
    main.setEditingId('12345678');
    expect(main.editingId).toEqual('12345678');
  });

  it('should call dragDrop method on cdkDropListDropped event', () => {
    const mockToDo = toDosService.toDosSignal()[0];
    const dragDropEvent: any = {
      previousIndex: 0,
      currentIndex: 1,
      container: {
        data: [mockToDo],
      },
    };

    spyOn(main, 'dragDrop');
    main.dragDrop(dragDropEvent);
    expect(main.dragDrop).toHaveBeenCalledWith(dragDropEvent);
  });

  it('should render correct number of app-to-do-item components', () => {
    const toDoItems = fixture.debugElement.queryAll(By.directive(ToDoItemComponent));
    expect(toDoItems.length).toBe(5);
  });
});
