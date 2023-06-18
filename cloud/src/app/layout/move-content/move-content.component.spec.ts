import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveContentComponent } from './move-content.component';

describe('MoveContentComponent', () => {
  let component: MoveContentComponent;
  let fixture: ComponentFixture<MoveContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
