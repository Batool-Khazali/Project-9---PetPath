import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSheltersComponent } from './update-shelters.component';

describe('UpdateSheltersComponent', () => {
  let component: UpdateSheltersComponent;
  let fixture: ComponentFixture<UpdateSheltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSheltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSheltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
