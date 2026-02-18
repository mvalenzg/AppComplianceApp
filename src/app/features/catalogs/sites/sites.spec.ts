import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sites } from './sites';
import { of } from 'rxjs';
import { SiteTable } from './components';
import { SiteForm } from './components/site-form/site-form';
import { SiteService } from './site-service';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';

describe('Sites', () => {
  let component: Sites;
  let fixture: ComponentFixture<Sites>;
  let siteServiceMock: any;

  const mockSites = [
    { id: 'a26d9144-8c33-4471-951f-ca803c7e986e', name: 'CVG', active: true },
    { id: 'b2d9b4ae-4905-4ab9-956e-b36a423dca47', name: 'MEM', active: false },
  ];

  beforeEach(async () => {
    siteServiceMock = {
      get: vi.fn().mockReturnValue(of(mockSites)),
    };

    await TestBed.configureTestingModule({
      imports: [Sites, SiteTable, SiteForm, DialogModule],
      providers: [{ provide: SiteService, useValue: siteServiceMock }, ConfirmationService],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(Sites);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call siteService.get on initialization', () => {
    fixture.detectChanges();
    expect(siteServiceMock.get).toHaveBeenCalledOnce();

    expect(component.siteResource.value()).toEqual(mockSites);
  });

  it('should pass sites to SiteTable', () => {
    fixture.detectChanges();

    // Buscamos el componente hijo en el DOM
    const tableDebugElement = fixture.nativeElement.querySelector('app-site-table');
    expect(tableDebugElement).toBeTruthy();

    // Si quieres ser más estricto y ver si los datos llegaron al @Input
    // podemos usar ng-reflect o acceder a las propiedades del elemento
    expect(tableDebugElement.innerHTML).toContain('CVG');
  });
});
