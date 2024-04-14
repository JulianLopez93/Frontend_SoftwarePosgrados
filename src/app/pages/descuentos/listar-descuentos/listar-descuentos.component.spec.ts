import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDescuentosComponent } from './listar-descuentos.component';

describe('ListarDescuentosComponent', () => {
  let component: ListarDescuentosComponent;
  let fixture: ComponentFixture<ListarDescuentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDescuentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarDescuentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
