import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContratacionComponent } from './edit-contratacion.component';

describe('EditContratacionComponent', () => {
  let component: EditContratacionComponent;
  let fixture: ComponentFixture<EditContratacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContratacionComponent]
    });
    fixture = TestBed.createComponent(EditContratacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
