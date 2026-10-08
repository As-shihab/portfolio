import { Component, OnInit, signal } from '@angular/core';
import { Profile, ProfileService } from '../../core/services/profile';
import { RevealDirective } from '../../shared/directives/reveal';

@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent implements OnInit {
  profile = signal<Profile | null>(null);
  readonly focusAreas = [
    'ERP and MES systems built to SAP standards',
    'Electron desktop apps that work offline and sync later',
    'Frontends in Angular, React and SAP UI5',
    'APIs with Node.js, NestJS, Laravel and OData v4',
    'Live machine monitoring over WebSocket and Modbus',
    'LLM agents and RAG with LangChain, LangGraph and Qdrant',
  ];

  readonly education = [
    {
      degree: 'B.Sc. in Computer Science & Engineering',
      institute: 'Presidency University',
      year: 'Aug 2023 - Present',
      summary: 'CGPA 3.60 so far. Studying alongside a full-time job.',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institute: 'Darunnajat Siddikia Kamil Madrasah',
      year: '2021 - 2022',
      summary: 'Science group, GPA 5.00.',
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institute: 'Science Group',
      year: '2019 - 2020',
      summary: 'GPA 4.78.',
    },
  ];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => this.profile.set(data),
      error: (err) => console.error('Failed to load profile', err)
    });
  }
}
