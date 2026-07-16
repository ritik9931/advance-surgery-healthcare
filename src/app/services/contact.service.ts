import { Injectable, signal } from '@angular/core';

export interface AppointmentPayload {
  name: string;
  mobile: string;
  city: string;
  disease: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  /** Clinic WhatsApp / Call number (kept in one place so it's easy to update) */
  readonly phoneDisplay = '+91 80824 06454';
  readonly phoneDial = '+918082406454';
  readonly whatsappNumber = '918082406454'; // country code + number, no plus/spaces

  /** Controls the global "Book Appointment" popup shown on site entry / via nav */
  readonly isModalOpen = signal(false);

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  /** Opens the phone dialer */
  callNow(): void {
    window.location.href = `tel:${this.phoneDial}`;
  }

  /** Opens WhatsApp chat, optionally with a pre-filled appointment message */
  openWhatsapp(payload?: Partial<AppointmentPayload>): void {
    const message = payload
      ? `Hello Advance Surgery Health Care, I would like to book an appointment.%0A%0AName: ${payload.name || '-'}%0AMobile: ${payload.mobile || '-'}%0ACity: ${payload.city || '-'}%0AConcern: ${payload.disease || '-'}`
      : 'Hello Advance Surgery Health Care, I would like to book an appointment.';
    const url = `https://wa.me/${this.whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
  }
}
