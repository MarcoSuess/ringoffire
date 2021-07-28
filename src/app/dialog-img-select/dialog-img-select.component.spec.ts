import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImgSelectComponent } from './dialog-img-select.component';

describe('DialogImgSelectComponent', () => {
  let component: DialogImgSelectComponent;
  let fixture: ComponentFixture<DialogImgSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogImgSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImgSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
