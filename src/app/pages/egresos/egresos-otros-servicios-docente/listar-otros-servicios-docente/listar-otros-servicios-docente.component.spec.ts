import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOtrosServiciosDocenteComponent } from './listar-otros-servicios-docente.component';

describe('ListarOtrosServiciosDocenteComponent', () => {
  let component: ListarOtrosServiciosDocenteComponent;
  let fixture: ComponentFixture<ListarOtrosServiciosDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarOtrosServiciosDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarOtrosServiciosDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
