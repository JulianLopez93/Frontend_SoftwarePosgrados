import { TestBed } from '@angular/core/testing';

import { EjecucionPresupuestalService } from './ejecucion-presupuestal.service';

describe('EjecucionPresupuestalService', () => {
  let service: EjecucionPresupuestalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjecucionPresupuestalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
