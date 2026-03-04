import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomoPayment } from './momo-payment';

describe('MomoPayment', () => {
  let component: MomoPayment;
  let fixture: ComponentFixture<MomoPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MomoPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MomoPayment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
