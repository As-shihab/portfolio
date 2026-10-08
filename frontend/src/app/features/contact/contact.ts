import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact';
import { RevealDirective } from '../../shared/directives/reveal';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  readonly email = 'study.shihab@gmail.com';
  readonly phone = { display: '+880 1604-279418', tel: '+8801604279418' };
  readonly socials = [
    { label: 'GitHub', url: 'https://github.com/As-shihab' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/as-shihab/' },
  ];

  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  copied = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  showError(control: string): boolean {
    const c = this.contactForm.get(control);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  copyEmail() {
    navigator.clipboard?.writeText(this.email).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitError = false;
      this.contactService.sendMessage(this.contactForm.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.contactForm.reset();
          setTimeout(() => this.submitSuccess = false, 5000);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submitError = true;
          console.error('Error sending message', err);
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
