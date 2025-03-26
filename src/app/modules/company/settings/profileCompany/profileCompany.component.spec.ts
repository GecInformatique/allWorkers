import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ProfileCompanyComponent} from "./profileCompany.component";


describe('ProfileCompanyComponent', () => {
  let component: ProfileCompanyComponent;
  let fixture: ComponentFixture<ProfileCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
