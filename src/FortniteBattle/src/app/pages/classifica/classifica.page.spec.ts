import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificaPage } from './classifica.page';

describe('ClassificaPage', () => {
  let component: ClassificaPage;
  let fixture: ComponentFixture<ClassificaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
