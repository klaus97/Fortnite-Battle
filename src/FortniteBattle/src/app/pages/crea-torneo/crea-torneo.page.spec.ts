import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaTorneoPage } from './crea-torneo.page';

describe('CreaTorneoPage', () => {
  let component: CreaTorneoPage;
  let fixture: ComponentFixture<CreaTorneoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaTorneoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaTorneoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
