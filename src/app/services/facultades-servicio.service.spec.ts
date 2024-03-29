import { TestBed } from '@angular/core/testing';

import { FacultadesServicioService } from './facultades-servicio.service';

describe('FacultadesServicioService', () => {
  let service: FacultadesServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultadesServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
