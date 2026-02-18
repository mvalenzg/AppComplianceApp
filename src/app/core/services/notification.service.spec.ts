import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { MessageService } from 'primeng/api';

describe('NotificationService', () => {
  let service: NotificationService;
  let primeNGNotificationService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService, MessageService],
    });

    service = TestBed.inject(NotificationService);
    primeNGNotificationService = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call primeNG MessageService.add with success and lifetime of 3000ms', () => {
    const spy = vi.spyOn(primeNGNotificationService, 'add');
    const detail = 'Sitio creado correctamente';

    service.success(detail);

    expect(spy).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success!',
      detail: detail,
      life: 3000,
    });
  });

  it('should call primeNG MessageService.add with error and lifetime of 5000ms', () => {
    const spy = vi.spyOn(primeNGNotificationService, 'add');
    const detail = 'something went wrong';

    service.error(detail);

    expect(spy).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: detail,
      life: 5000,
    });
  });

  it('should call primeNG MessageService.add with custom title', () => {
    const spy = vi.spyOn(primeNGNotificationService, 'add');
    const detail = 'hey you!';

    service.success(detail, 'look at me!');

    expect(spy).toHaveBeenCalledWith({
      severity: 'success',
      detail: detail,
      life: 3000,
      summary: 'look at me!',
    });
  });
});
