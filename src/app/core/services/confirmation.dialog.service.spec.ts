import { TestBed } from '@angular/core/testing';

import { ConfirmationDialogService } from './confirmation.dialog.service';
import { ConfirmationService } from 'primeng/api';

describe('ConfirmationDialogService', () => {
  let service: ConfirmationDialogService;
  let primeNGConfirmationService: ConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmationDialogService, ConfirmationService],
    });

    service = TestBed.inject(ConfirmationDialogService);
    primeNGConfirmationService = TestBed.inject(ConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call primeNG confirmationService.confirm with default values', () => {
    const spy = vi.spyOn(primeNGConfirmationService, 'confirm');

    service.confirm({
      message: 'Do you want to delete this?',
      accept: () => {},
    });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        header: 'are you sure?',
        message: 'Do you want to delete this?',
        rejectLabel: 'Cancel',
      }),
    );
  });

  it('should use custom severity and labels when provided', () => {
    const spy = vi.spyOn(primeNGConfirmationService, 'confirm');

    service.confirm({
      message: 'Confirmar acción',
      header: 'Título Custom',
      acceptLabel: 'Sí, borrar',
      severity: 'info',
      accept: () => {},
    });

    const callArgs = spy.mock.calls[0][0];
    expect(callArgs.acceptButtonProps?.severity).toBe('info');
    expect(callArgs.header).toBe('Título Custom');
  });

  it('should execute accept callback when confirmed', () => {
    const acceptSpy = vi.fn();

    // Simulamos que el usuario hace click en aceptar inmediatamente
    vi.spyOn(primeNGConfirmationService, 'confirm').mockImplementation((options) => {
      if (options.accept) options.accept();
      return primeNGConfirmationService;
    });

    service.confirm({
      message: 'test',
      accept: acceptSpy
    });

    expect(acceptSpy).toHaveBeenCalled();
  });
});
