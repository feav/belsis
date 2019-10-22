import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesPage } from './commandes.page';

describe('CommandesPage', () => {
  let component: CommandesPage;
  let fixture: ComponentFixture<CommandesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
