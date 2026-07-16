import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, SavedAppointment } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  passcode = '';
  loginError = signal(false);
  search = signal('');

  appointments = signal<SavedAppointment[]>([]);
  loading = signal(false);
  loadError = signal(false);

  statusOptions = ['pending', 'contacted', 'confirmed', 'cancelled', 'completed'];

  filtered = computed(() => {
    const term = this.search().trim().toLowerCase();
    const all = this.appointments();
    if (!term) return all;
    return all.filter(a =>
      a.name.toLowerCase().includes(term) ||
      a.mobile.includes(term) ||
      a.city.toLowerCase().includes(term) ||
      a.disease.toLowerCase().includes(term)
    );
  });

  constructor(public contact: ContactService, private toast: ToastService) {}

  ngOnInit(): void {
    if (this.contact.isAdminAuthed()) {
      this.loadAppointments();
    }
  }

  login(): void {
    const ok = this.contact.adminLogin(this.passcode);
    this.loginError.set(!ok);
    if (ok) {
      this.passcode = '';
      this.loadAppointments();
    }
  }

  logout(): void {
    this.contact.adminLogout();
  }

  loadAppointments(): void {
    this.loading.set(true);
    this.loadError.set(false);
    this.contact.fetchAppointments().subscribe({
      next: (res) => {
        this.loading.set(false);
        this.appointments.set(res.data || []);
      },
      error: () => {
        this.loading.set(false);
        this.loadError.set(true);
        this.toast.error('Could not load appointments. Please refresh and try again.');
      }
    });
  }

  onStatusChange(appointment: SavedAppointment, newStatus: string): void {
    const previous = appointment.status;
    appointment.status = newStatus; // optimistic update
    this.contact.updateAppointmentStatus(appointment.id, newStatus).subscribe({
      next: (res) => {
        this.toast.success(res.message || 'Status updated successfully.');
        appointment.updated_at = res.data.updated_at;
      },
      error: () => {
        appointment.status = previous; // revert on failure
        this.toast.error('Could not update status. Please try again.');
      }
    });
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  }

  exportCsv(): void {
    const rows = this.filtered();
    if (!rows.length) return;
    const header = ['ID', 'Name', 'Mobile', 'City', 'Concern', 'Status', 'Source', 'Submitted At'];
    const lines = rows.map(r => [
      r.id, r.name, r.mobile, r.city, r.disease, r.status, r.source, this.formatDate(r.submitted_at)
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));
    const csv = [header.join(','), ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  waLink(mobile: string): string {
    const digits = mobile.replace(/\D/g, '');
    const withCountry = digits.length === 10 ? `91${digits}` : digits;
    return `https://wa.me/${withCountry}`;
  }
}