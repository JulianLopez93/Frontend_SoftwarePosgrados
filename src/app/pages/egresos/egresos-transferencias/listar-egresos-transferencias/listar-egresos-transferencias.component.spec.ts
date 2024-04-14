import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEgresosTransferenciasComponent } from './listar-egresos-transferencias.component';

describe('ListarEgresosTransferenciasComponent', () => {
  let component: ListarEgresosTransferenciasComponent;
  let fixture: ComponentFixture<ListarEgresosTransferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEgresosTransferenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEgresosTransferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
