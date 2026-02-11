import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTable } from './owner-table';

describe('OwnerTable', () => {
  let component: OwnerTable;
  let fixture: ComponentFixture<OwnerTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
