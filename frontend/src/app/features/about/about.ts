import { Component, OnInit, signal } from '@angular/core';
import { Profile, ProfileService } from '../../core/services/profile';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent implements OnInit {
  profile = signal<Profile | null>(null);
  readonly quickStats = [
    { label: 'Experience', value: '1.5+ yrs' },
    { label: 'ERP/MES Work', value: '3+ systems' },
    { label: 'Core Stack', value: 'Angular + Node' },
  ];

  readonly focusAreas = [
    'SAP-standard ERP and MES solution development',
    'Offline/online Electron desktop applications',
    'Angular, React, Tailwind CSS, and SAP UI5 frontends',
    'Node.js, Laravel, NestJS, Prisma, and OData v4 APIs',
    'Real-time machine monitoring with WebSocket and Modbus',
  ];

  readonly education = [
    {
      degree: 'B.Sc. in Computer Science & Engineering',
      institute: 'Presidency University',
      year: 'Aug 2023 - Present',
      summary: 'Continuing computer science studies with a current CGPA of 3.60 while building production ERP and web systems.',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institute: 'Darunnajat Siddikia Kamil Madrasah',
      year: '2021 - 2022',
      summary: 'Completed Science group with GPA 5.00 out of 5.00.',
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institute: 'Science Group',
      year: '2019 - 2020',
      summary: 'Completed SSC with GPA 4.78 out of 5.00.',
    },
  ];

  readonly journey = [
    {
      role: 'Software Developer',
      company: 'Hybritech Innovation LTD',
      period: 'Dec 2025 - Present',
      details: 'Designing a full-scale SAP-standard ERP, CI/CD pipelines on AWS EC2 and SAP HANA, Electron apps, OData v4 microservices, and real-time machine monitoring.',
    },
    {
      role: 'Junior Software Developer',
      company: 'Hybritech Innovation LTD | SCT Bangla LTD',
      period: 'Jan 2025 - Nov 2025',
      details: 'Built ERP-MES modules including ShiftVisu for production error monitoring and MES-integrated ERP systems for textile operations.',
    },
    {
      role: 'Intern',
      company: 'Simec System LTD',
      period: 'Oct 2024 - Dec 2024',
      details: 'Integrated REST APIs with Node.js, Express.js, Prisma, MySQL, and MongoDB while building React apps with authentication, email verification, FTP tooling, and product management.',
    },
  ];

  readonly projectHighlights = [
    'Aptigen ERP desktop and web platform for HR, inventory, production, machine management, and marketplace operations.',
    'Offline and online desktop ERP built with Electron, React, SAP UI5, SQLite, and sync tooling.',
    'Server architecture using Supabase, Node.js, NestJS, OData, Prisma, MySQL, and WebSocket communication.',
    'ShiftVisu production monitoring module for real-time plant and hall error tracking.',
  ];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => this.profile.set(data),
      error: (err) => console.error('Failed to load profile', err)
    });
  }
}
