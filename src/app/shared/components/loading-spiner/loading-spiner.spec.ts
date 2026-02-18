import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpiner } from './loading-spiner';
import { LoaderService } from '../../../core';

describe('LoadingSpiner', () => {
  let component: LoadingSpiner;
  let fixture: ComponentFixture<LoadingSpiner>;
  let loadingService: LoaderService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpiner],
      providers: [LoaderService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpiner);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(LoaderService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render progressSpinner while is loading', () => {
    loadingService.show();
    fixture.detectChanges();

    var compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('p-progressSpinner')).toBeTruthy();
  });

  it('should not render progressSpinner by default', () => {
    fixture.detectChanges();

    var compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('p-progressSpinner')).toBeFalsy();
  });

  it('should hide progressSpinner after loading finishes', () => {
    loadingService.show();
    fixture.detectChanges();

    loadingService.hide();
    fixture.detectChanges();

    var compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('p-progressSpinner')).toBeFalsy();
  });
});
