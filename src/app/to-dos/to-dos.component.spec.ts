import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ToDosComponent } from './to-dos.component';

describe('ToDosComponent', () => {
  let toDos: ToDosComponent;
  let fixture: ComponentFixture<ToDosComponent>;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [ToDosComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ToDosComponent);
        toDos = fixture.debugElement.componentInstance;
      })));

  it('should create the "ToDosComponent"', () => {
    expect(toDos).toBeTruthy();
  });
});
