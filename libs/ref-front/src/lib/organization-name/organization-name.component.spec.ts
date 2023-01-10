import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationNameComponent } from './organization-name.component';

describe('OrganizationNameComponent', () => {
  let component: OrganizationNameComponent;
  let fixture: ComponentFixture<OrganizationNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationNameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
