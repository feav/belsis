import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauPage } from './nouveau.page';

describe('NouveauPage', () => {
  let component: NouveauPage;
  let fixture: ComponentFixture<NouveauPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
