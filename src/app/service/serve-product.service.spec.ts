import { TestBed } from '@angular/core/testing';

import { ServeProductService } from './serve-product.service';

describe('ServeProductService', () => {
  let service: ServeProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServeProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
