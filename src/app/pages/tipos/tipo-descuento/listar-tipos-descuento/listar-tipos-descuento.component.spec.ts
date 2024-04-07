import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTiposDescuentoComponent } from './listar-tipos-descuento.component';

describe('ListarTiposDescuentoComponent', () => {
  let component: ListarTiposDescuentoComponent;
  let fixture: ComponentFixture<ListarTiposDescuentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTiposDescuentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTiposDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
