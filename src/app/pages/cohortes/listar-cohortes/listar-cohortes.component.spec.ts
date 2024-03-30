import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCohortesComponent } from './listar-cohortes.component';

describe('ListarCohortesComponent', () => {
  let component: ListarCohortesComponent;
  let fixture: ComponentFixture<ListarCohortesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCohortesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCohortesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
