import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEliminarDepartamentosComponent } from './popup-eliminar-departamentos.component';

describe('PopupEliminarDepartamentosComponent', () => {
  let component: PopupEliminarDepartamentosComponent;
  let fixture: ComponentFixture<PopupEliminarDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupEliminarDepartamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEliminarDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
