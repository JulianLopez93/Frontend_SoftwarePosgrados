import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEgresosOtrosComponent } from './listar-egresos-otros.component';

describe('ListarEgresosOtrosComponent', () => {
  let component: ListarEgresosOtrosComponent;
  let fixture: ComponentFixture<ListarEgresosOtrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEgresosOtrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEgresosOtrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
