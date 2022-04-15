import { TestBed } from '@angular/core/testing';

import { ServeCategoryService } from './serve-category.service';

describe('ServeCategoryService', () => {
  let service: ServeCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServeCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
