import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareFileToOtherComponent } from './share-file-to-other.component';

describe('ShareFileToOtherComponent', () => {
  let component: ShareFileToOtherComponent;
  let fixture: ComponentFixture<ShareFileToOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareFileToOtherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareFileToOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
