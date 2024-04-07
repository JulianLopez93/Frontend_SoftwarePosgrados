import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTiposCostoComponent } from './listar-tipos-costo.component';

describe('ListarTiposCostoComponent', () => {
  let component: ListarTiposCostoComponent;
  let fixture: ComponentFixture<ListarTiposCostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTiposCostoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTiposCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
