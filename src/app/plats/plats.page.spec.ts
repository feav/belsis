import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatsPage } from './plats.page';

describe('PlatsPage', () => {
  let component: PlatsPage;
  let fixture: ComponentFixture<PlatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
