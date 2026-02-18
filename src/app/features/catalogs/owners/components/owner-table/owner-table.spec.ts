import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTable } from './owner-table';

describe('OwnerTable', () => {
  let component: OwnerTable;
  let fixture: ComponentFixture<OwnerTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerTable],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the status tag with correct text and severity with active: true', () => {
    fixture.componentRef.setInput('owners', [
      { id: 'b2d9b4ae-4905-4ab9-956e-b36a423dca47', name: 'CVG', active: true },
    ]);

    fixture.detectChanges();

    const tableBody = fixture.nativeElement.querySelector('p-table');
    expect(tableBody.textContent).toContain('Active');

    const pTag = fixture.nativeElement.querySelector('p-tag');
    expect(pTag.classList.toString()).toContain('p-tag-success');
  });

  it('should render the status tag with correct text and severity with active: false', () => {
    fixture.componentRef.setInput('owners', [
      { id: 'b2d9b4ae-4905-4ab9-956e-b36a423dca47', name: 'CVG', active: false },
    ]);

    fixture.detectChanges();

    const tableBody = fixture.nativeElement.querySelector('p-table');
    expect(tableBody.textContent).toContain('Inactive');

    const pTag = fixture.nativeElement.querySelector('p-tag');
    expect(pTag.classList.toString()).toContain('p-tag-danger');
  });
});
