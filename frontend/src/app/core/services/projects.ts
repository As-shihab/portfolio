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
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce solution with product management, shopping cart, and secure checkout.',
      imageUrl: 'assets/projects/ecommerce-platform.svg',
      technologies: ['Angular', 'ASP.NET Core', 'SQL Server'],
      demoUrl: 'https://ecommerce.example.com',
      githubUrl: 'https://github.com/username/ecommerce',
      category: 'Website'
    },
    {
      id: 2,
      title: 'Task Master App',
      description: 'A productivity mobile application for managing daily tasks and team collaboration.',
      imageUrl: 'assets/projects/task-master-app.svg',
      technologies: ['React Native', 'Node.js', 'MongoDB'],
      demoUrl: 'https://taskmaster.example.com',
      githubUrl: 'https://github.com/username/task-master',
      category: 'Mobile'
    },
    {
      id: 3,
      title: 'Corporate CRM',
      description: 'Customer Relationship Management system for tracking leads and sales pipelines.',
      imageUrl: 'assets/projects/corporate-crm.svg',
      technologies: ['Laravel', 'Vue.js', 'MySQL'],
      demoUrl: 'https://crm.example.com',
      githubUrl: 'https://github.com/username/corporate-crm',
      category: 'Website'
    },
    {
      id: 4,
      title: 'Social Connect',
      description: 'Real-time social networking platform with chat and media sharing capabilities.',
      imageUrl: 'assets/projects/social-connect.svg',
      technologies: ['React.js', 'Firebase', 'Tailwind CSS'],
      githubUrl: 'https://github.com/username/social-connect',
      demoUrl: 'https://social.example.com',
      category: 'Website'
    },
    {
      id: 5,
      title: 'Fitness Tracker',
      description: 'Mobile app for tracking workouts, nutrition, and personal health goals.',
      imageUrl: 'assets/projects/fitness-tracker.svg',
      technologies: ['React Native', 'Redux', 'Express.js'],
      githubUrl: 'https://github.com/username/fitness-tracker',
      demoUrl: 'https://fitness-tracker.example.com',
      category: 'Mobile'
    },
    {
      id: 6,
      title: 'Server Management Tool',
      description: 'Web-based dashboard for monitoring and managing VPS instances.',
      imageUrl: 'assets/projects/server-management-tool.svg',
      technologies: ['Angular', 'Node.js', 'Docker'],
      githubUrl: 'https://github.com/username/vps-manager',
      demoUrl: 'https://vps-manager.example.com',
      category: 'Website'
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
