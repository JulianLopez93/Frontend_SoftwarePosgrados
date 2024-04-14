import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEgresosGeneralesComponent } from './listar-egresos-generales.component';

describe('ListarEgresosGeneralesComponent', () => {
  let component: ListarEgresosGeneralesComponent;
  let fixture: ComponentFixture<ListarEgresosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEgresosGeneralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEgresosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
