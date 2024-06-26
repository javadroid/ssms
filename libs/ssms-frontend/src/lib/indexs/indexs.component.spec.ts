import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexsComponent } from './indexs.component';

describe('IndexsComponent', () => {
  let component: IndexsComponent;
  let fixture: ComponentFixture<IndexsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndexsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
