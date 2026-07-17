import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService, AppointmentPayload } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-appointment-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './appointment-modal.component.html',
  styleUrl: './appointment-modal.component.scss'
})
export class AppointmentModalComponent implements OnInit {
  model: AppointmentPayload = { name: '', mobile: '', city: '', disease: '' };
  submitted = signal(false);
  submitting = signal(false);

  diseases = [
    'Stapler Circumcision',
    'Frenuloplasty',
    'Laser Circumcision',
    'Phimosis',
    'Piles (Hemorrhoids)',
    'Anal Fistula',
    'Anal Fissure',
    'Gallstone',
    'Kidney Stones',
    'Hernia',
    'Enlarged Prostate (BPH)',
    'Other / Not sure'
  ];

  constructor(public contact: ContactService, private toast: ToastService) {}

  ngOnInit(): void {
    // Auto-show the appointment popup shortly after the page loads
    setTimeout(() => {
      this.contact.openModal();
    }, 2500);
  }

  close(): void {
    this.contact.closeModal();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  submit(form: NgForm): void {
    if (form.invalid) {
      Object.values(form.controls).forEach(c => c.markAsTouched());
      return;
    }
    this.submitting.set(true);
    this.contact.submitAppointment(this.model).subscribe({
      next: (res) => {
        this.submitting.set(false);
        this.submitted.set(true);
        this.toast.success(res.message || 'Appointment submitted successfully.');
        this.contact.openWhatsapp(this.model);
      },
      error: () => {
        this.submitting.set(false);
        this.toast.error('Could not submit appointment. Please try again or call us directly.');
      }
    });
  }

  bookAnother(): void {
    this.submitted.set(false);
    this.model = { name: '', mobile: '', city: '', disease: '' };
  }
}