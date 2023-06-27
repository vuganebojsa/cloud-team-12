import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopShareFileComponent } from './stop-share-file.component';

describe('StopShareFileComponent', () => {
  let component: StopShareFileComponent;
  let fixture: ComponentFixture<StopShareFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopShareFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopShareFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
