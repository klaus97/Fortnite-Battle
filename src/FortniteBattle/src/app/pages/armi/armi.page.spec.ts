import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmiPage } from './armi.page';

describe('ArmiPage', () => {
  let component: ArmiPage;
  let fixture: ComponentFixture<ArmiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
