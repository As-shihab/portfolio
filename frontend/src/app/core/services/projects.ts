import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: 'Website' | 'Mobile' | 'Desktop' | 'Other';
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiUrl = 'https://localhost:7085/api/projects';

  private projects: Project[] = [
    {
      id: 2,
      title: 'ShiftVisu',
      description: 'Shows production errors and machine failures across halls and plants as they happen, so supervisors can react quickly.',
      imageUrl: '',
      technologies: ['Angular', 'Node.js', 'WebSocket', 'Modbus'],
      category: 'Other'
    },
    {
      id: 3,
      title: 'Offline-first Desktop ERP',
      description: 'A desktop ERP that keeps working when the internet drops and syncs everything back when it returns.',
      imageUrl: '',
      technologies: ['Electron', 'React', 'SAP UI5', 'SQLite'],
      category: 'Desktop'
    },
    {
      id: 4,
      title: 'Bandab Textile MES-ERP',
      description: 'An ERP with MES built in for a textile company, so the office and the shop floor share the same data.',
      imageUrl: '',
      technologies: ['React', 'Laravel', 'NestJS', 'Tailwind CSS'],
      category: 'Website'
    },
    {
      id: 5,
      title: 'Shopfloor ERP (Italy)',
      description: 'Production and shop floor workflows for a manufacturer in Italy, built through SCT Bangla.',
      imageUrl: '',
      technologies: ['Angular', 'SAP UI5', 'Node.js', 'WebSocket'],
      category: 'Website'
    },
    {
      id: 6,
      title: 'ERP Service Layer',
      description: 'The OData v4 services and real-time channels the ERP apps talk to.',
      imageUrl: '',
      technologies: ['Supabase', 'NestJS', 'OData v4', 'Prisma', 'MySQL'],
      category: 'Other'
    }
  ];

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    // return this.http.get<Project[]>(this.apiUrl);
    return of(this.projects);
  }

  getProject(id: number): Observable<Project | undefined> {
    // return this.http.get<Project>(`${this.apiUrl}/${id}`);
    return of(this.projects.find(p => p.id === id));
  }

  addProject(project: Project): Observable<Project> {
    // return this.http.post<Project>(this.apiUrl, project);
    this.projects.push(project);
    return of(project);
  }
}
