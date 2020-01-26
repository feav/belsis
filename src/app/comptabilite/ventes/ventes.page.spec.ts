import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentesPage } from './ventes.page';

describe('VentesPage', () => {
  let component: VentesPage;
  let fixture: ComponentFixture<VentesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
