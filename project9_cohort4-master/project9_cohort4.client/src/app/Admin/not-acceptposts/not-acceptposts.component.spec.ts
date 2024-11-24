import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAcceptpostsComponent } from './not-acceptposts.component';

describe('NotAcceptpostsComponent', () => {
  let component: NotAcceptpostsComponent;
  let fixture: ComponentFixture<NotAcceptpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotAcceptpostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAcceptpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
