import { Component, Input } from '@angular/core';

export type SpecialtyKey =
  | 'piles' | 'fistula' | 'fissure' | 'gallstone'
  | 'kidney' | 'hernia' | 'circumcision' | 'prostate' | 'frenuloplasty';

@Component({
  selector: 'app-specialty-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 64 64" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
      @switch (key) {
        @case ('piles') {
          <path d="M22 46c-4-3-6-8-6-13 0-10 7-19 16-19s16 9 16 19c0 5-2 10-6 13" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M22 46h20v4a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4v-4Z" stroke="var(--color-primary)" stroke-width="2.4" stroke-linejoin="round"/>
          <circle cx="26" cy="22" r="2.6" fill="var(--color-accent)"/>
          <circle cx="36" cy="18" r="2.6" fill="var(--color-accent)"/>
          <circle cx="40" cy="26" r="2.6" fill="var(--color-accent)"/>
        }
        @case ('frenuloplasty') {
          <path d="M24 10c0 8 2 12 2 18s-2 10-2 18" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M40 10c0 8-2 12-2 18s2 10 2 18" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M26 28h12" stroke="var(--color-accent)" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 4.5"/>
          <path d="M30 22l4 4-4 4" stroke="var(--color-accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="24" cy="14" r="1.8" fill="var(--color-primary)"/>
          <circle cx="40" cy="14" r="1.8" fill="var(--color-primary)"/>
        }
        @case ('fistula') {
          <path d="M32 8c-9 0-14 7-14 15 0 12 6 18 6 26" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M32 8c9 0 14 7 14 15 0 12-6 18-6 26" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M24 46h16" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M40 22c3 1 5 4 4 8" stroke="var(--color-accent)" stroke-width="2.4" stroke-linecap="round"/>
          <circle cx="45" cy="31" r="2.4" fill="var(--color-accent)"/>
        }
        @case ('fissure') {
          <path d="M20 44c-3-3-5-7-5-12 0-9 7-17 17-17s17 8 17 17c0 5-2 9-5 12" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M32 20v18" stroke="var(--color-accent)" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 4.5"/>
          <path d="M22 46h20v3a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4v-3Z" stroke="var(--color-primary)" stroke-width="2.4" stroke-linejoin="round"/>
        }
        @case ('gallstone') {
          <path d="M26 12c-2 4-6 5-6 12 0 6 5 8 5 14a8 8 0 0 0 16 0" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M34 10c3 2 4 5 4 9" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <circle cx="29" cy="30" r="3" fill="var(--color-accent)"/>
          <circle cx="35" cy="36" r="2.2" fill="var(--color-accent)"/>
        }
        @case ('kidney') {
          <path d="M20 14c-6 3-8 9-6 16 2 6-2 9-1 15 1 6 8 8 12 4 3-3 2-7 5-9 4-3 8 0 11-4 3-4 1-9-3-11-5-2-6-8-11-11-3-2-5-1-7 0Z" stroke="var(--color-primary)" stroke-width="2.4" stroke-linejoin="round"/>
          <circle cx="30" cy="30" r="3" fill="var(--color-accent)"/>
          <path d="M44 20c4 3 6 8 6 12" stroke="var(--color-accent)" stroke-width="2.2" stroke-linecap="round"/>
        }
        @case ('hernia') {
          <path d="M18 20a10 10 0 0 1 20 0v4a10 10 0 0 0 8 10" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <circle cx="28" cy="20" r="5" stroke="var(--color-accent)" stroke-width="2.4"/>
          <path d="M20 42h24" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M20 48h24" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round" opacity="0.5"/>
        }
        @case ('circumcision') {
          <rect x="24" y="8" width="16" height="10" rx="3" stroke="var(--color-primary)" stroke-width="2.4"/>
          <path d="M32 18v20" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M24 40c0 5 3.6 8 8 8s8-3 8-8" stroke="var(--color-primary)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M20 24l6 4M44 24l-6 4" stroke="var(--color-accent)" stroke-width="2.2" stroke-linecap="round"/>
        }
        @case ('prostate') {
          <path d="M22 20c0-5 4-9 10-9s10 4 10 9-4 8-4 14a6 6 0 0 1-12 0c0-6-4-9-4-14Z" stroke="var(--color-primary)" stroke-width="2.4" stroke-linejoin="round"/>
          <circle cx="27" cy="20" r="2.2" fill="var(--color-accent)"/>
          <circle cx="37" cy="20" r="2.2" fill="var(--color-accent)"/>
        }
      }
    </svg>
  `
})
export class SpecialtyIconComponent {
  @Input({ required: true }) key!: SpecialtyKey;
}
