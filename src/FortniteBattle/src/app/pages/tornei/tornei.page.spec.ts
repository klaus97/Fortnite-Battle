import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneiPage } from './tornei.page';

describe('TorneiPage', () => {
  let component: TorneiPage;
  let fixture: ComponentFixture<TorneiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorneiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorneiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
