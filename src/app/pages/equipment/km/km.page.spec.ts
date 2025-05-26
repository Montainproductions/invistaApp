import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KmPage } from './km.page';

describe('KmPage', () => {
  let component: KmPage;
  let fixture: ComponentFixture<KmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
