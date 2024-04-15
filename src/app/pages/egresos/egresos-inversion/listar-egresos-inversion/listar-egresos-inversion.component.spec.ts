import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEgresosInversionComponent } from './listar-egresos-inversion.component';

describe('ListarEgresosInversionComponent', () => {
  let component: ListarEgresosInversionComponent;
  let fixture: ComponentFixture<ListarEgresosInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEgresosInversionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEgresosInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
