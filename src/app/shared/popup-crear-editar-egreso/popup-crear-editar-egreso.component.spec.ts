import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCrearEditarEgresoComponent } from './popup-crear-editar-egreso.component';

describe('PopupCrearEditarEgresoComponent', () => {
  let component: PopupCrearEditarEgresoComponent;
  let fixture: ComponentFixture<PopupCrearEditarEgresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCrearEditarEgresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCrearEditarEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
