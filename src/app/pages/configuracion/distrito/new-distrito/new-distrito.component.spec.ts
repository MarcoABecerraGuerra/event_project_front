import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDistritoComponent } from './new-distrito.component';

describe('NewDistritoComponent', () => {
  let component: NewDistritoComponent;
  let fixture: ComponentFixture<NewDistritoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDistritoComponent]
    });
    fixture = TestBed.createComponent(NewDistritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
