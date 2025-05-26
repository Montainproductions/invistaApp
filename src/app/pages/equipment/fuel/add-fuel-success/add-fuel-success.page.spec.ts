import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFuelSuccessPage } from './add-fuel-success.page';

describe('AddFuelSuccessPage', () => {
  let component: AddFuelSuccessPage;
  let fixture: ComponentFixture<AddFuelSuccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFuelSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
