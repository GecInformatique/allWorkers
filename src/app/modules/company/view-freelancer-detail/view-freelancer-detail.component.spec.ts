import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFreelancerDetailComponent } from './view-freelancer-detail.component';

describe('ViewFreelancerDetailComponent', () => {
  let component: ViewFreelancerDetailComponent;
  let fixture: ComponentFixture<ViewFreelancerDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectDetailComponent]
    });
    fixture = TestBed.createComponent(ViewFreelancerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
