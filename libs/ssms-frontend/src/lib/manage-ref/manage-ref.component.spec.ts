import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRefComponent } from './manage-ref.component';

describe('ManageRefComponent', () => {
  let component: ManageRefComponent;
  let fixture: ComponentFixture<ManageRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageRefComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
