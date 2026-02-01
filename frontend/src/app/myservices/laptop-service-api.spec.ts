import { TestBed } from '@angular/core/testing';

import { LaptopServiceAPI } from './laptop-service-api';

describe('LaptopServiceAPI', () => {
  let service: LaptopServiceAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaptopServiceAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
