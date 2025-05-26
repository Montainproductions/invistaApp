import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFuelPage } from './add-fuel.page';

describe('AddFuelPage', () => {
  let component: AddFuelPage;
  let fixture: ComponentFixture<AddFuelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFuelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
