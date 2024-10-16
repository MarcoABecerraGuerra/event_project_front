import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContratacionComponent } from './new-contratacion.component';

describe('NewContratacionComponent', () => {
  let component: NewContratacionComponent;
  let fixture: ComponentFixture<NewContratacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewContratacionComponent]
    });
    fixture = TestBed.createComponent(NewContratacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
