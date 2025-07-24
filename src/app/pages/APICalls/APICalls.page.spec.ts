import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APICallsPage } from './APICalls.page';

describe('APICallPage', () => {
  let component: APICallsPage;
  let fixture: ComponentFixture<APICallsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(APICallsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});