import { TestBed } from '@angular/core/testing';

import { FakeProduct } from './fake-product';

describe('FakeProduct', () => {
  let service: FakeProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeProduct);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
