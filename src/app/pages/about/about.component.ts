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
    { year: '2007', text: 'Advance Surgery Health Care founded with a single proctology clinic.' },
    { year: '2013', text: 'Introduced laser surgery for piles, fistula and fissure treatment.' },
    { year: '2018', text: 'Expanded into full urology & general surgery specialities.' },
    { year: '2024', text: 'Crossed 15,000+ successful, minimally-invasive procedures.' }
  ];

  values = [
    { title: 'Patient First', desc: 'Every treatment plan is built around comfort, dignity and outcomes.', icon: '🤍' },
    { title: 'Precision', desc: 'Laser & laparoscopic techniques for minimal scarring, faster healing.', icon: '🎯' },
    { title: 'Transparency', desc: 'Clear pricing and honest guidance — no unnecessary procedures.', icon: '🔍' },
    { title: 'Accessibility', desc: 'Instant booking via call or WhatsApp, 7 days a week.', icon: '📲' }
  ];

  constructor(public contact: ContactService) {}
}
