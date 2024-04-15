import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEgresosRecurrentesComponent } from './listar-egresos-recurrentes.component';

describe('ListarEgresosRecurrentesComponent', () => {
  let component: ListarEgresosRecurrentesComponent;
  let fixture: ComponentFixture<ListarEgresosRecurrentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEgresosRecurrentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEgresosRecurrentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
