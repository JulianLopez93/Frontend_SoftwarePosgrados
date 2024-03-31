import { TestBed } from '@angular/core/testing';

import { CohortesService } from './cohortes.service';

describe('CohortesService', () => {
  let service: CohortesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CohortesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
