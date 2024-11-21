import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTrabajadorComponent } from './new-trabajador.component';

describe('NewTrabajadorComponent', () => {
  let component: NewTrabajadorComponent;
  let fixture: ComponentFixture<NewTrabajadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTrabajadorComponent]
    });
    fixture = TestBed.createComponent(NewTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
