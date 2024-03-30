import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEliminarFacultadComponent } from './popup-eliminar-facultad.component';

describe('PopupEliminarFacultadComponent', () => {
  let component: PopupEliminarFacultadComponent;
  let fixture: ComponentFixture<PopupEliminarFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupEliminarFacultadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEliminarFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
