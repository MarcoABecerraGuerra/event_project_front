import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTipoEventoComponent } from './new-tipo-evento.component';

describe('NewTipoEventoComponent', () => {
  let component: NewTipoEventoComponent;
  let fixture: ComponentFixture<NewTipoEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTipoEventoComponent]
    });
    fixture = TestBed.createComponent(NewTipoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
