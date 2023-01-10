import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCrimeComponent } from './create-crime.component';

describe('CreatCrimeComponent', () => {
  let component: CreateCrimeComponent;
  let fixture: ComponentFixture<CreateCrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCrimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
