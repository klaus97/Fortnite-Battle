import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaAvatarPage } from './modifica-avatar.page';

describe('ModificaAvatarPage', () => {
  let component: ModificaAvatarPage;
  let fixture: ComponentFixture<ModificaAvatarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaAvatarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaAvatarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
