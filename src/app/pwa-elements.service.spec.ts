import { TestBed } from '@angular/core/testing';

import { PwaElementsService } from './pwa-elements.service';

describe('PwaElementsService', () => {
  let service: PwaElementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwaElementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
