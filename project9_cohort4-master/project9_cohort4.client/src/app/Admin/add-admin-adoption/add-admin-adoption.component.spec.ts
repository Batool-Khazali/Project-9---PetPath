import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminAdoptionComponent } from './add-admin-adoption.component';

describe('AddAdminAdoptionComponent', () => {
  let component: AddAdminAdoptionComponent;
  let fixture: ComponentFixture<AddAdminAdoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAdminAdoptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
