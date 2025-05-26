import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMaintenanceSuccessPage } from './add-maintenance-success.page';

describe('AddMaintenanceSuccessPage', () => {
  let component: AddMaintenanceSuccessPage;
  let fixture: ComponentFixture<AddMaintenanceSuccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaintenanceSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
