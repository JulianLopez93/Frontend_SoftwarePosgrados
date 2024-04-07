import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPresupuestosComponent } from './listar-presupuestos.component';

describe('ListarPresupuestosComponent', () => {
  let component: ListarPresupuestosComponent;
  let fixture: ComponentFixture<ListarPresupuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPresupuestosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPresupuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
