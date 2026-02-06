import { Component, effect, inject, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISite } from '../../ISite.interface';

@Component({
  selector: 'app-site-form',
  imports: [ReactiveFormsModule, InputTextModule, ToggleButtonModule, ButtonModule],
  templateUrl: './site-form.html',
  styleUrl: './site-form.scss',
})
export class SiteForm {
  private fb = inject(FormBuilder);

  // Input para recibir datos en caso de edición
  siteData = input<ISite | null>(null);

  onSave = output<ISite>();
  onCancel = output<void>();

  siteForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    active: [true],
  });

  constructor() {
    // Si recibimos datos (edición), parchamos el formulario
    effect(() => {
      const data = this.siteData();
      if (data) this.siteForm.patchValue(data);
    });
  }

  onSubmit() {
    if (this.siteForm.valid) {
      // getRawValue garantiza que obtienes todos los campos definidos en el form
      const site = this.siteForm.getRawValue() as ISite;
      this.onSave.emit(site);
    }
  }
}
