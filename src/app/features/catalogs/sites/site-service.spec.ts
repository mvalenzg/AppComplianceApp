import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { SiteService } from './site-service';

describe('SiteService', () => {
  const apiUrl = 'https://localhost:7299/api/sites';
  let service: SiteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(SiteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get sites via GET', () => {
    const mockData = [{ id: crypto.randomUUID(), name: 'CVG', active: true }];

    service.get().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });

  it('should handle 400 bard request when name is invalid', () => {
    const invalidStie = { name: '' };
    const errorMessage = 'Name is required';

    service.create(invalidStie).subscribe({
      next: () => {
        throw new Error('should be fail with 400');
      },
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.error).toBe(errorMessage);
      },
    });
    const req = httpMock.expectOne(apiUrl);

    // Simulamos la respuesta de error de .NET
    req.flush(errorMessage, {
      status: 400,
      statusText: 'Bad Request',
    });
  });
});
