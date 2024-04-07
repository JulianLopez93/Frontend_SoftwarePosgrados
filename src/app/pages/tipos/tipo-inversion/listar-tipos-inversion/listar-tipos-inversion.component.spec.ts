import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTiposInversionComponent } from './listar-tipos-inversion.component';

describe('ListarTiposInversionComponent', () => {
  let component: ListarTiposInversionComponent;
  let fixture: ComponentFixture<ListarTiposInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTiposInversionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTiposInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
