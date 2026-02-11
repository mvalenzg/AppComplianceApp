import { ComponentFixture, TestBed } from '@angular/core/testing';
import { resolveComponentResources } from '@angular/compiler';
import { Sites } from './sites';
import { of } from 'rxjs';
import { SiteTable } from './components';
import { SiteForm } from './components/site-form/site-form';
import { SiteService } from './site-service';

describe('Sites', () => {
  let component: Sites;
  let fixture: ComponentFixture<Sites>;
  let siteServiceMock: any;

  const mockSites = [
    { id: crypto.randomUUID(), name: 'CVG', active: true },
    { id: crypto.randomUUID(), name: 'MEM', active: false },
  ];

  beforeEach(async () => {
    siteServiceMock = {
      get: vi.fn().mockReturnValue(of(mockSites)),
    };

    await TestBed.configureTestingModule({
      imports: [Sites, SiteTable, SiteForm],
      providers: [{ provide: SiteService, useValue: siteServiceMock }],
    });
    await resolveComponentResources();
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(Sites);
    component = fixture.componentInstance;
    // await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call siteService.get on initialization', () => {
    fixture.detectChanges();
    expect(siteServiceMock.get).toHaveBeenCalledOnce();

    expect(component.siteResource.value()).toEqual(mockSites);
  });

  // it('should pass sites to TableSiteComponent', () => {
  //   fixture.detectChanges();

  //   // Buscamos el componente hijo en el DOM
  //   const tableDebugElement = fixture.nativeElement.querySelector('app-table-site');
  //   expect(tableDebugElement).toBeTruthy();

  //   // Si quieres ser más estricto y ver si los datos llegaron al @Input
  //   // podemos usar ng-reflect o acceder a las propiedades del elemento
  //   expect(tableDebugElement.innerHTML).toContain('Planta Chihuahua');
  // });
});
