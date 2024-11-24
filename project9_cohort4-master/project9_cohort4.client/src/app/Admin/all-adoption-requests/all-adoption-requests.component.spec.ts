import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdoptionRequestsComponent } from './all-adoption-requests.component';

describe('AllAdoptionRequestsComponent', () => {
  let component: AllAdoptionRequestsComponent;
  let fixture: ComponentFixture<AllAdoptionRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllAdoptionRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAdoptionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
