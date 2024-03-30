import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCrearEditarComponent } from './popup-crear-editar.component';

describe('PopupCrearEditarComponent', () => {
  let component: PopupCrearEditarComponent;
  let fixture: ComponentFixture<PopupCrearEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCrearEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
