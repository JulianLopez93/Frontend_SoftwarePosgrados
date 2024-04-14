import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEgresosServiciosNoDocenteComponent } from './listar-egresos-servicios-no-docente.component';

describe('ListarEgresosServiciosNoDocenteComponent', () => {
  let component: ListarEgresosServiciosNoDocenteComponent;
  let fixture: ComponentFixture<ListarEgresosServiciosNoDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEgresosServiciosNoDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEgresosServiciosNoDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
