import { ComponentFixture, TestBed } from '@angular/core/testing';
import {SidemenuCompanyComponent} from "./sidemenuCompany.component";


describe('SidemenuCompanyComponent', () => {
  let component: SidemenuCompanyComponent;
  let fixture: ComponentFixture<SidemenuCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidemenuCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidemenuCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
