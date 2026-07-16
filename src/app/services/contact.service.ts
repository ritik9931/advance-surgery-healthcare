import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AppointmentPayload {
  name: string;
  mobile: string;
  city: string;
  disease: string;
  source?: string;
  notes?: string;
}

export interface SavedAppointment {
  id: number;
  name: string;
  mobile: string;
  city: string;
  disease: string;
  status: string;   // pending | contacted | confirmed | cancelled | completed
  source: string;
  notes: string | null;
  submitted_at: string;
  updated_at: string;
}

interface SaveAppointmentResponse {
  success: boolean;
  message: string;
  data: SavedAppointment;
}

interface GetAppointmentsResponse {
  success: boolean;
  total: number;
  data: SavedAppointment[];
}

const AUTH_KEY = 'asc_admin_auth';
/** Change this before going live — this is a lightweight client-side gate only. */
const ADMIN_PASSCODE = 'admin123';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly apiBase = 'https://yo4vts.in/vtswebapi/api/appointment';

  /** Clinic WhatsApp / Call number (kept in one place so it's easy to update) */
  readonly phoneDisplay = '+91 80824 06454';
  readonly phoneDial = '+918082406454';
  readonly whatsappNumber = '918082406454'; // country code + number, no plus/spaces

  /** Clinic location — used for the Google Maps embed on the Contact page */
  readonly address = '123 Health Avenue, Banjara Hills, Hyderabad, Telangana';
  readonly mapsEmbedUrl =
    `https://www.google.com/maps?q=${encodeURIComponent(this.address)}&output=embed`;
  readonly mapsDirectionsUrl =
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.address)}`;

  /** Controls the global "Book Appointment" popup shown on site entry / via nav */
  readonly isModalOpen = signal(false);

  /** Whether the current browser session is authenticated into /admin */
  readonly isAdminAuthed = signal<boolean>(sessionStorage.getItem(AUTH_KEY) === 'true');

  constructor(private http: HttpClient) {}

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

  /** POST /appointment/saveAppointment */
  submitAppointment(payload: AppointmentPayload): Observable<SaveAppointmentResponse> {
    const body = {
      name: payload.name,
      mobile: payload.mobile,
      city: payload.city,
      disease: payload.disease,
      source: payload.source || 'website',
      notes: payload.notes || ''
    };
    return this.http.post<SaveAppointmentResponse>(`${this.apiBase}/saveAppointment`, body);
  }

  /** GET /appointment/getAppointments */
  fetchAppointments(): Observable<GetAppointmentsResponse> {
    return this.http.get<GetAppointmentsResponse>(`${this.apiBase}/getAppointments`);
  }

  /** PUT /appointment/updateAppointmentStatus/:id/status */
  updateAppointmentStatus(id: number, status: string): Observable<SaveAppointmentResponse> {
    return this.http.put<SaveAppointmentResponse>(
      `${this.apiBase}/updateAppointmentStatus/${id}/status`,
      { status }
    );
  }

  /** Very lightweight staff login — swap for real auth before production use */
  adminLogin(passcode: string): boolean {
    const ok = passcode === ADMIN_PASSCODE;
    if (ok) {
      this.isAdminAuthed.set(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
    }
    return ok;
  }

  adminLogout(): void {
    this.isAdminAuthed.set(false);
    sessionStorage.removeItem(AUTH_KEY);
  }
}