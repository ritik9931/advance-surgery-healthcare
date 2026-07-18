import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  milestones = [
    { year: '2014', text: 'Priva Health Care was founded to provide advanced Laser & Stapler Circumcision and Frenuloplasty care.' },
    { year: '2017', text: 'Expanded services with advanced laser treatments for Piles, Fistula, and Fissure.' },
    { year: '2021', text: 'Introduced comprehensive Urology and General Surgery specialties.' },
    { year: '2026', text: 'Successfully performed 15,000+ minimally invasive procedures with excellent patient outcomes.' }
  ];

  values = [
    { title: 'Patient First', desc: 'Every treatment plan is built around comfort, dignity and outcomes.', icon: '🤍' },
    { title: 'Precision', desc: 'Laser & laparoscopic techniques for minimal scarring, faster healing.', icon: '🎯' },
    { title: 'Transparency', desc: 'Clear pricing and honest guidance — no unnecessary procedures.', icon: '🔍' },
    { title: 'Accessibility', desc: 'Instant booking via call or WhatsApp, 7 days a week.', icon: '📲' }
  ];

  constructor(public contact: ContactService) {}
}
