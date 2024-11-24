import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostadminComponent } from './postadmin.component';

describe('PostadminComponent', () => {
  let component: PostadminComponent;
  let fixture: ComponentFixture<PostadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
