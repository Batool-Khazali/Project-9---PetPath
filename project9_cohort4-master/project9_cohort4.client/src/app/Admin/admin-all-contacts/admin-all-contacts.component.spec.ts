import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllContactsComponent } from './admin-all-contacts.component';

describe('AdminAllContactsComponent', () => {
  let component: AdminAllContactsComponent;
  let fixture: ComponentFixture<AdminAllContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAllContactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
