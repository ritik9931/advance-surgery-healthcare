import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService, AppointmentPayload } from '../../services/contact.service';

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

  diseases = [
    'Piles (Hemorrhoids)',
    'Anal Fistula',
    'Anal Fissure',
    'Gallstone',
    'Kidney Stones',
    'Hernia',
    'Laser Circumcision',
    'Enlarged Prostate (BPH)',
    'Other / Not sure'
  ];

  constructor(public contact: ContactService) {}

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
    this.submitted.set(true);
    this.contact.openWhatsapp(this.model);
  }

  bookAnother(): void {
    this.submitted.set(false);
    this.model = { name: '', mobile: '', city: '', disease: '' };
  }
}
