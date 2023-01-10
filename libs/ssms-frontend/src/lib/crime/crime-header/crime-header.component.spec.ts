import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeHeaderComponent } from './crime-header.component';

describe('CrimeHeaderComponent', () => {
  let component: CrimeHeaderComponent;
  let fixture: ComponentFixture<CrimeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrimeHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrimeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
