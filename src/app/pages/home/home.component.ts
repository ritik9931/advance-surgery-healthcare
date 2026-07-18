import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService, AppointmentPayload } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';
import { SpecialtyIconComponent, SpecialtyKey } from '../../components/specialty-icons/specialty-icon.component';

interface Specialty {
  key: SpecialtyKey;
  name: string;
  desc: string;
  tag: 'Proctology' | 'Urology' | 'General Surgery' | 'Frenuloplasty' | 'Circumcision';
}

interface Doctor {
  name: string;
  role: string;
  exp: string;
  photo: string;
  specialty: SpecialtyKey;
}

interface Review {
  name: string;
  city: string;
  text: string;
  rating: number;
  procedure: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, SpecialtyIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  heroModel: AppointmentPayload = { name: '', mobile: '', city: '', disease: '' };
  heroSubmitted = false;
  heroSubmitting = false;

  stats = [
    { value: '15,000+', label: 'Successful Treatments' },
    { value: '20+', label: 'Years of Excellence' },
    { value: '60+', label: 'Expert Doctors' },
    { value: '60+', label: 'Partner Hospitals' },
    { value: '50+', label: 'Cities Served' },
    { value: '4.8/5', label: 'Patient Rating' }
  ];

  specialties: Specialty[] = [
    { key: 'circumcision', name: 'Laser Circumcision', desc: 'Stitch-less, bloodless laser circumcision.', tag: 'Circumcision' },
    { key: 'frenuloplasty', name: 'Frenuloplasty', desc: 'Minimally invasive frenuloplasty procedure.', tag: 'Frenuloplasty' },
    { key: 'circumcision', name: 'Stapler Circumcision', desc: 'Minimally invasive stapler circumcision.', tag: 'Circumcision' },
    { key: 'piles', name: 'Piles (Hemorrhoids)', desc: 'Painless Laser Piles surgery with same-day discharge.', tag: 'Proctology' },
    { key: 'fistula', name: 'Anal Fistula', desc: 'Advanced VAAFT & laser fistula treatment.', tag: 'Proctology' },
    { key: 'fissure', name: 'Anal Fissure', desc: 'Minimally invasive fissure care, fast healing.', tag: 'Proctology' },
    { key: 'gallstone', name: 'Gallstone', desc: 'Laparoscopic gallbladder stone removal.', tag: 'General Surgery' },
    { key: 'kidney', name: 'Kidney Stones', desc: 'Laser lithotripsy for quick, painless recovery.', tag: 'Urology' },
    { key: 'hernia', name: 'Hernia', desc: 'Laparoscopic hernia repair with mesh technique.', tag: 'General Surgery' },
    
    { key: 'prostate', name: 'Enlarged Prostate (BPH)', desc: 'Advanced TURP & laser prostate treatment.', tag: 'Urology' }
  ];

  doctors: Doctor[] = [
    { name: 'Dr. Rakesh Verma', role: 'Laser & Stapler Circumcision Specialist', exp: '20+ Years Experience', photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop', specialty: 'circumcision' },
    { name: 'Dr. Suresh Iyer', role: 'Frenuloplasty Surgeon', exp: '14+ Years Experience', photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop', specialty: 'frenuloplasty' },
    { name: 'Dr. Arvind Nair', role: 'Chief Proctologist — Piles Care', exp: '18+ Years Experience', photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop', specialty: 'piles' },
    { name: 'Dr. Manoj Deshpande', role: 'Fistula & VAAFT Specialist', exp: '15+ Years Experience', photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=400&auto=format&fit=crop', specialty: 'fistula' }
  ];

  reviews: Review[] = [
    { name: 'Ramesh Gupta', city: 'Hyderabad', rating: 5, procedure: 'Laser Piles Surgery', text: 'Painless procedure, was discharged the same evening. The staff was caring and explained everything clearly before surgery.' },
    { name: 'Priya Sharma', city: 'Secunderabad', rating: 5, procedure: 'Kidney Stone Treatment', text: 'Booked my appointment on WhatsApp within minutes. The laser treatment was quick and I was back to work in two days.' },
    { name: 'Mohammed Aslam', city: 'Warangal', rating: 5, procedure: 'Hernia Surgery', text: 'Very professional team. Dr. Suresh explained the laparoscopic procedure in detail and recovery was faster than I expected.' },
    { name: 'Kavita Reddy', city: 'Hyderabad', rating: 4, procedure: 'Anal Fistula Treatment', text: 'Clean hospital, courteous staff, and the doctor followed up personally after my surgery. Highly recommend this hospital.' }
  ];

  diseases = this.specialties.map(s => s.name).concat('Other / Not sure');

  whyUs = [
    { title: 'Laser & Stapler Circumcision', desc: 'Stitch-less, blood-less procedures with faster recovery.', icon: '⚡' },
    { title: 'Same-Day Discharge', desc: 'Most procedures allow you to go home the same day.', icon: '🏠' },
    { title: 'Expert Surgeons', desc: 'Board-certified specialists with 10+ years of experience.', icon: '🎓' },
    { title: 'Transparent Pricing', desc: 'No hidden costs — insurance & cashless support available.', icon: '💳' }
  ];

  constructor(public contact: ContactService, private toast: ToastService) {}

  submitHero(form: NgForm): void {
    if (form.invalid) {
      Object.values(form.controls).forEach(c => c.markAsTouched());
      return;
    }
    this.heroSubmitting = true;
    this.contact.submitAppointment(this.heroModel).subscribe({
      next: (res) => {
        this.heroSubmitting = false;
        this.heroSubmitted = true;
        this.toast.success(res.message || 'Appointment submitted successfully.');
        this.contact.openWhatsapp(this.heroModel);
      },
      error: () => {
        this.heroSubmitting = false;
        this.toast.error('Could not submit appointment. Please try again or call us directly.');
      }
    });
  }

  resetHero(): void {
    this.heroSubmitted = false;
    this.heroSubmitting = false;
    this.heroModel = { name: '', mobile: '', city: '', disease: '' };
  }

  starsArray(n: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i < n ? 1 : 0);
  }
}