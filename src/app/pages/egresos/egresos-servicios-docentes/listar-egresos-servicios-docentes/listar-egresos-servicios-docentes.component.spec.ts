import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEgresosServiciosDocentesComponent } from './listar-egresos-servicios-docentes.component';

describe('ListarEgresosServiciosDocentesComponent', () => {
  let component: ListarEgresosServiciosDocentesComponent;
  let fixture: ComponentFixture<ListarEgresosServiciosDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEgresosServiciosDocentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEgresosServiciosDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
