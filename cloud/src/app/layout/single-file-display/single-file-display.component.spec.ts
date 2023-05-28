import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFileDisplayComponent } from './single-file-display.component';

describe('SingleFileDisplayComponent', () => {
  let component: SingleFileDisplayComponent;
  let fixture: ComponentFixture<SingleFileDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleFileDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleFileDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
