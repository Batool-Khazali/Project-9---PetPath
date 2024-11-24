import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSheltersComponent } from './all-shelters.component';

describe('AllSheltersComponent', () => {
  let component: AllSheltersComponent;
  let fixture: ComponentFixture<AllSheltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllSheltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSheltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
