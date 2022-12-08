import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCategoryComponent } from './organization-category.component';

describe('OrganizationCategoryComponent', () => {
  let component: OrganizationCategoryComponent;
  let fixture: ComponentFixture<OrganizationCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationCategoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
