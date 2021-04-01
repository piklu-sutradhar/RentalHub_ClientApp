import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPropertyModalComponent } from './add-edit-property-modal.component';

describe('AddEditPropertyModalComponent', () => {
  let component: AddEditPropertyModalComponent;
  let fixture: ComponentFixture<AddEditPropertyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPropertyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPropertyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
