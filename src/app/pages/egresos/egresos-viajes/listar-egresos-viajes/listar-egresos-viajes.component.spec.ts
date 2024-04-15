import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEgresosViajesComponent } from './listar-egresos-viajes.component';

describe('ListarEgresosViajesComponent', () => {
  let component: ListarEgresosViajesComponent;
  let fixture: ComponentFixture<ListarEgresosViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEgresosViajesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEgresosViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
