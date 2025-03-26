import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHeaderComponent } from './freelancerheader.component';

describe('FreelancerheaderComponent', () => {
  let component: CompanyHeaderComponent;
  let fixture: ComponentFixture<CompanyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
