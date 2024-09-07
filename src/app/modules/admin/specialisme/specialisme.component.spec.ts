import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialismeComponent } from './specialisme.component';

describe('SpecialismeComponent', () => {
  let component: SpecialismeComponent;
  let fixture: ComponentFixture<SpecialismeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialismeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
