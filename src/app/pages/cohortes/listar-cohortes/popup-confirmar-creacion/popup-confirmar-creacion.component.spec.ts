import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfirmarCreacionComponent } from './popup-confirmar-creacion.component';

describe('PopupConfirmarCreacionComponent', () => {
  let component: PopupConfirmarCreacionComponent;
  let fixture: ComponentFixture<PopupConfirmarCreacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupConfirmarCreacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupConfirmarCreacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
