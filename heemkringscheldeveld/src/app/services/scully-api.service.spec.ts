import { TestBed } from '@angular/core/testing';

import { ScullyApiService } from './scully-api.service';

describe('ScullyApiService', () => {
  let service: ScullyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScullyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
