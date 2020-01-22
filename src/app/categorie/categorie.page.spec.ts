import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriePage } from './categorie.page';

describe('CategoriePage', () => {
  let component: CategoriePage;
  let fixture: ComponentFixture<CategoriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
