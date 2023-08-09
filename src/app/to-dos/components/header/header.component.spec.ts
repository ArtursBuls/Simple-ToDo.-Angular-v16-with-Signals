import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let header: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        header = fixture.debugElement.componentInstance;
      })));

  it('should create the "HeaderComponent"', () => {
    expect(header).toBeTruthy();
  });
});
