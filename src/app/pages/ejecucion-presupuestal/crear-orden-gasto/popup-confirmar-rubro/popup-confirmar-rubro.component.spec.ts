import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfirmarRubroComponent } from './popup-confirmar-rubro.component';

describe('PopupConfirmarRubroComponent', () => {
  let component: PopupConfirmarRubroComponent;
  let fixture: ComponentFixture<PopupConfirmarRubroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupConfirmarRubroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupConfirmarRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
