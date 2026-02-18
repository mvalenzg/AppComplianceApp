import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTable } from './site-table';

describe('SiteTable', () => {
  let component: SiteTable;
  let fixture: ComponentFixture<SiteTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteTable],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render active status as "Active" using the status pipe', () => {
    fixture.componentRef.setInput('sites', [
      { id: 'b2d9b4ae-4905-4ab9-956e-b36a423dca47', name: 'CVG', active: true },
    ]);

    fixture.detectChanges();

    const tableBody = fixture.nativeElement.querySelector('p-table');
    expect(tableBody.textContent).toContain('Active');
  });

  it('should render inactive status as "Inactive" using the status pipe', () => {
    fixture.componentRef.setInput('sites', [
      { id: 'b2d9b4ae-4905-4ab9-956e-b36a423dca47', name: 'CVG', active: false },
    ]);

    fixture.detectChanges();

    const tableBody = fixture.nativeElement.querySelector('p-table');
    expect(tableBody.textContent).toContain('Inactive');
  });

  it('should apply the correct severity class for status', () => {
    fixture.componentRef.setInput('sites', [
      { id: 'b2d9b4ae-4905-4ab9-956e-b36a423dca47', name: 'CVG', active: false },
    ]);

    fixture.detectChanges();

    const pTag = fixture.nativeElement.querySelector('p-tag');
    expect(pTag.classList.toString()).toContain('p-tag-danger');
  });
});
