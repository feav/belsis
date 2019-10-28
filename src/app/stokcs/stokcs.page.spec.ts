import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StokcsPage } from './stokcs.page';

describe('StokcsPage', () => {
  let component: StokcsPage;
  let fixture: ComponentFixture<StokcsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StokcsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StokcsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
