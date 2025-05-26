import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddKmSuccessPage } from './add-km-success.page';

describe('AddKmSuccessPage', () => {
  let component: AddKmSuccessPage;
  let fixture: ComponentFixture<AddKmSuccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKmSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
