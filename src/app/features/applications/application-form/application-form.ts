import { IApplication } from './../IApplication';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { IOwner, ISite, OwnerService, SiteService } from '../../catalogs';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppOptions } from '../../../core/enums/app.enums';

@Component({
  selector: 'app-application-form',
  imports: [
    StepperModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FloatLabelModule,
    SelectModule,
    CheckboxModule,
    TextareaModule,
  ],
  templateUrl: './application-form.html',
  styleUrl: './application-form.scss',
})
export class ApplicationForm implements OnInit {
  fb = inject(FormBuilder);
  private readonly siteService = inject(SiteService);
  sites = signal<ISite[]>([]);
  private readonly ownersService = inject(OwnerService);
  owners = signal<IOwner[]>([]);
  private readonly destroyRef = inject(DestroyRef);

  data = input<IApplication | null>(null);

  onSave = output<IApplication>();
  onCancel = output<void>();

  appOptions = [
    { label: 'Not Applicable', value: AppOptions.NOT_APPLICABLE },
    { label: 'Yes', value: AppOptions.YES },
    { label: 'No', value: AppOptions.NO },
  ];

  appForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    siteId: ['', [Validators.required]],
    ownerId: ['', [Validators.required]],
    // Campos con Toggles
    hasRepo: [false],
    repoUrl: [''],
    hasBrd: [AppOptions.NO],
    hasFsd: [AppOptions.NO],
    hasTsd: [AppOptions.NO],
    documentationUrl: [''],
    hasPipeLine: [AppOptions.NO],
    hasAutomaticDeploys: [AppOptions.NO],
    hasSonar: [AppOptions.NO],
    sonasUrl: [''],
    notes: [''], // Opcional usualmente
  });

  constructor() {
    effect(() => {
      const data = this.data();
      if (data) this.appForm.patchValue(data);
    });
  }

  ngOnInit(): void {
    this.setupConditionalValidation();
    this.loadSites();
    this.loadOwners();
  }

  private setupConditionalValidation(): void {
    // Definimos los pares: [Control que manda, Control que se valida]
    const conditions = [
      { toggle: 'hasRepo', target: 'repoUrl' },
      { toggle: 'hasSonar', target: 'sonasUrl' },
    ];

    conditions.forEach((cond) => {
      this.appForm
        .get(cond.toggle)
        ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)) // Buena práctica en Angular moderno
        .subscribe((val) => {
          const targetControl = this.appForm.get(cond.target);
          if (Number(val) === AppOptions.YES) {
            targetControl?.setValidators([Validators.required, Validators.pattern('https?://.+')]);
          } else {
            targetControl?.clearValidators();
            targetControl?.setValue('');
          }
          targetControl?.updateValueAndValidity();
        });
    });

    const docToggles = ['hasBrd', 'hasFsd', 'hasTsd'];
    docToggles.forEach((t) => {
      this.appForm.get(t)?.valueChanges.subscribe(() => {
        const anyDoc = docToggles.some((field) => this.appForm.get(field)?.value);
        const docUrl = this.appForm.get('documentationUrl');
        if (anyDoc) {
          docUrl?.setValidators([Validators.required, Validators.pattern('https?://.+')]);
        } else {
          docUrl?.clearValidators();
          docUrl?.setValue('');
        }
        docUrl?.updateValueAndValidity();
      });
    });
  }

  private loadSites(): void {
    this.siteService.get().subscribe({
      next: (data) => this.sites.update((v) => data),
      error: console.error,
    });
  }

  private loadOwners(): void {
    this.ownersService.get().subscribe({
      next: (data) => this.owners.update((v) => data),
      error: console.error,
    });
  }

  getSiteName(id: string) {
    return this.sites().find((s) => s.id === id)?.name || 'N/A';
  }

  getOwnerName(id: string) {
    return this.owners().find((o) => o.id === id)?.fullName || 'N/A';
  }

  onSubmit() {
    if (this.appForm.valid) {
      const app = this.appForm.getRawValue() as IApplication;
      this.onSave.emit(app);
    }
  }
}
