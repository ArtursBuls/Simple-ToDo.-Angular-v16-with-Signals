import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let footer: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [FooterComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FooterComponent);
        footer = fixture.debugElement.componentInstance;
      })));

  it('should create the "FooterComponent"', () => {
    expect(footer).toBeTruthy();
  });
});
