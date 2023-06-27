import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFolderDisplayComponent } from './single-folder-display.component';

describe('SingleFolderDisplayComponent', () => {
  let component: SingleFolderDisplayComponent;
  let fixture: ComponentFixture<SingleFolderDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleFolderDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleFolderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
