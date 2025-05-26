import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFuelPage } from './edit-fuel.page';

describe('EditFuelPage', () => {
  let component: EditFuelPage;
  let fixture: ComponentFixture<EditFuelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFuelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
