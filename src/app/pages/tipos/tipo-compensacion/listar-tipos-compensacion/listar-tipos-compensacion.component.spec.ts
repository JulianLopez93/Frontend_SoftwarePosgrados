import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTiposCompensacionComponent } from './listar-tipos-compensacion.component';

describe('ListarTiposCompensacionComponent', () => {
  let component: ListarTiposCompensacionComponent;
  let fixture: ComponentFixture<ListarTiposCompensacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTiposCompensacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTiposCompensacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
