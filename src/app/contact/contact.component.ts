import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, InputTextareaModule, ButtonModule, DialogModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  contactForm: FormGroup;
  successMessage: string | null = null;
  displaySuccessDialog: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.successMessage = 'Demande de contact envoyée avec succès';
      this.displaySuccessDialog = true;
      this.contactForm.reset();
    }
  }
}
