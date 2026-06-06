import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string; // 'Present' or date string
  description: string[];
  technologies: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private mockExperience: Experience[] = [
    {
      id: 0,
      role: 'Software Developer',
      company: 'Hybritech Innovation LTD',
      location: 'Onsite',
      startDate: 'Dec 2025',
      endDate: 'Present',
      description: [
        'Designing and developing a full-scale ERP solution aligned with SAP standards.',
        'Managing CI/CD pipelines with AWS EC2 and SAP HANA for automated testing and deployment.',
        'Developing cross-platform Electron desktop applications and dynamic Angular, React, and Tailwind CSS frontends.',
        'Building Laravel, Node.js, Prisma ORM, and OData v4 microservices for flexible data querying.',
        'Implementing real-time machine monitoring with Modbus protocol and WebSocket communication.'
      ],
      technologies: ['Electron', 'Angular', 'React', 'Tailwind CSS', 'Node.js', 'Laravel', 'Prisma ORM', 'MySQL', 'PostgreSQL', 'MongoDB', 'AWS EC2', 'SAP HANA', 'OData v4', 'WebSocket', 'Modbus']
    },
    {
      id: 1,
      role: 'Project-Based ERP Developer',
      company: 'SCT Bangla LTD | Shopfloor, Italy',
      location: 'Onsite',
      startDate: 'Mar 2025',
      endDate: 'Dec 2025',
      description: [
        'Worked on an ERP project for Shopfloor, an Italian company, through SCT Bangla LTD.',
        'Built ERP workflows focused on shop floor operations and production management.',
        'Contributed frontend and backend implementation for project-based enterprise software delivery.'
      ],
      technologies: ['ERP', 'React', 'Angular', 'Laravel', 'SAP UI5', 'Node.js', 'NestJS', 'WebSocket', 'Tailwind CSS']
    },
    {
      id: 2,
      role: 'Junior Software Developer',
      company: 'Hybritech Innovation LTD',
      location: 'Onsite',
      startDate: 'Jan 2025',
      endDate: 'Nov 2025',
      description: [
        'Designed and developed ERP-MES module solutions for industrial production workflows.',
        'Built the ShiftVisu module for real-time production error and failure monitoring across hall and plant operations.',
        'Developed a comprehensive MES-integrated ERP system for Bandab Textile using modern frontend and backend stacks.'
      ],
      technologies: ['React', 'Angular', 'Laravel', 'SAP UI5', 'Node.js', 'NestJS', 'WebSocket', 'Tailwind CSS']
    },
    {
      id: 3,
      role: 'Intern',
      company: 'Simec System LTD',
      location: 'Onsite',
      startDate: 'Oct 2024',
      endDate: 'Dec 2024',
      description: [
        'Developed and integrated REST APIs using Node.js, Express.js, Prisma, MySQL, and MongoDB.',
        'Built complete React.js web applications with token-based authentication and email verification.',
        'Implemented FTP tooling and a relational product management system.'
      ],
      technologies: ['Node.js', 'Express.js', 'Prisma', 'MySQL', 'MongoDB', 'React.js', 'REST API']
    }
  ];

  constructor() { }

  getExperience(): Observable<Experience[]> {
    return of(this.mockExperience);
  }
}
