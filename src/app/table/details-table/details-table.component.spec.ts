import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTableComponent } from './details-table.component';

describe('DetailsTableComponent', () => {
  let component: DetailsTableComponent;
  let fixture: ComponentFixture<DetailsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTableComponent ],
      schemas: [CUSTOM_ELEMENT          this.tableId = JSON.parse(params.tableId);
S_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
