import { TestBed } from '@angular/core/testing';

import { InvistaService } from './invista.service';

describe('InvistaService', () => {
  let service: InvistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
