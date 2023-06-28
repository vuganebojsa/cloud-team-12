import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInfoComponent } from './display-info.component';

describe('DisplayInfoComponent', () => {
  let component: DisplayInfoComponent;
  let fixture: ComponentFixture<DisplayInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
