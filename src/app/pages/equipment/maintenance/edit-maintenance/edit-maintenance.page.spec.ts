import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMaintenancePage } from './edit-maintenance.page';

describe('EditMaintenancePage', () => {
  let component: EditMaintenancePage;
  let fixture: ComponentFixture<EditMaintenancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMaintenancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
