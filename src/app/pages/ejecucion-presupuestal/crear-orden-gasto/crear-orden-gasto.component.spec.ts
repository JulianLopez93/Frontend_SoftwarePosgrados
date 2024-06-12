import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOrdenGastoComponent } from './crear-orden-gasto.component';

describe('CrearOrdenGastoComponent', () => {
  let component: CrearOrdenGastoComponent;
  let fixture: ComponentFixture<CrearOrdenGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearOrdenGastoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearOrdenGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
