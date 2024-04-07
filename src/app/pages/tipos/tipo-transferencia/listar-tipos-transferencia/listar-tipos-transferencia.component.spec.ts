import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTiposTransferenciaComponent } from './listar-tipos-transferencia.component';

describe('ListarTiposTransferenciaComponent', () => {
  let component: ListarTiposTransferenciaComponent;
  let fixture: ComponentFixture<ListarTiposTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTiposTransferenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTiposTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
