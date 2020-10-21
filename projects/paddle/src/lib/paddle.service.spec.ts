import { TestBed } from '@angular/core/testing';

import { PaddleService } from './paddle.service';

describe('PaddleService', () => {
  let service: PaddleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaddleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
