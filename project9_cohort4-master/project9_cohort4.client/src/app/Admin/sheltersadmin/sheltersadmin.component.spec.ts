import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheltersadminComponent } from './sheltersadmin.component';

describe('SheltersadminComponent', () => {
  let component: SheltersadminComponent;
  let fixture: ComponentFixture<SheltersadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SheltersadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheltersadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
