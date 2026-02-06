import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTable } from './site-table';

describe('SiteTable', () => {
  let component: SiteTable;
  let fixture: ComponentFixture<SiteTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
