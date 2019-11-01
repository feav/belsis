import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptabilitePage } from './comptabilite.page';

describe('ComptabilitePage', () => {
  let component: ComptabilitePage;
  let fixture: ComponentFixture<ComptabilitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptabilitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptabilitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
