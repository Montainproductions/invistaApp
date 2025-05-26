import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddKmPage } from './add-km.page';

describe('AddKmPage', () => {
  let component: AddKmPage;
  let fixture: ComponentFixture<AddKmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
