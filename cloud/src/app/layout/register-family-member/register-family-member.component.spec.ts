import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFamilyMemberComponent } from './register-family-member.component';

describe('RegisterFamilyMemberComponent', () => {
  let component: RegisterFamilyMemberComponent;
  let fixture: ComponentFixture<RegisterFamilyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFamilyMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFamilyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
