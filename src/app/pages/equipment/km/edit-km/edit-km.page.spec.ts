import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditKmPage } from './edit-km.page';

describe('EditKmPage', () => {
  let component: EditKmPage;
  let fixture: ComponentFixture<EditKmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
