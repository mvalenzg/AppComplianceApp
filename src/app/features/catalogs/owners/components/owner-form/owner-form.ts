import { IOwner } from './../IOwner.interface';
import { Component, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-owner-form',
  imports: [ReactiveFormsModule, InputTextModule, ToggleButtonModule, ButtonModule],
  templateUrl: './owner-form.html',
  styleUrl: './owner-form.scss',
})
export class OwnerForm {
  private fb = inject(FormBuilder);

  ownerData = input<IOwner | null>(null);

  onSave = output<IOwner>();
  onCancel = output<void>();

  ownerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required, Validators.maxLength(100)],
    active: [true],
  });

  constructor() {
    effect(() => {
      const data = this.ownerData();
      if (data) this.ownerForm.patchValue(data);
    });
  }

  onSubmit() {
    const site = this.ownerForm.getRawValue() as IOwner;
    this.onSave.emit(site);
  }
}
