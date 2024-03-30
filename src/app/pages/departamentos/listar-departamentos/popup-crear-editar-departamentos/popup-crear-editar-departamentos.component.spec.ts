import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCrearEditarDepartamentosComponent } from './popup-crear-editar-departamentos.component';

describe('PopupCrearEditarDepartamentosComponent', () => {
  let component: PopupCrearEditarDepartamentosComponent;
  let fixture: ComponentFixture<PopupCrearEditarDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCrearEditarDepartamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCrearEditarDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
