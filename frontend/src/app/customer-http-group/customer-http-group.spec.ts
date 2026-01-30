import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHttpGroup } from './customer-http-group';

describe('CustomerHttpGroup', () => {
  let component: CustomerHttpGroup;
  let fixture: ComponentFixture<CustomerHttpGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerHttpGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerHttpGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
