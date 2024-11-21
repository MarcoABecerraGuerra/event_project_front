import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoEventoComponent } from './edit-tipo-evento.component';

describe('EditTipoEventoComponent', () => {
  let component: EditTipoEventoComponent;
  let fixture: ComponentFixture<EditTipoEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTipoEventoComponent]
    });
    fixture = TestBed.createComponent(EditTipoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
