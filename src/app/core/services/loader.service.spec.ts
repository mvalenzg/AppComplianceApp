import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
    });
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with "isLoading" false', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('should change "isLoding" to true when when calling "show()"', () => {
    service.show();
    expect(service.isLoading()).toBe(true);
  });

  it('should change "isLoding" to false when when calling "hide()"', () => {
    service.show();
    service.hide();
    expect(service.isLoading()).toBe(false);
  });

  it('"isLoading" should be readonly', () => {
    expect(service.isLoading).not.toHaveProperty('set');
  });
});
