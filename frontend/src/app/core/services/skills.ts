import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Skill {
  id: number;
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Other';
  proficiency: number; // 0-100
  icon?: string; // Optional icon class or URL
}

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private apiUrl = 'https://localhost:7085/api/skills';

  private skills: Skill[] = [
    { id: 1, name: 'Angular', category: 'Frontend', proficiency: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
    { id: 10, name: 'Next.js', category: 'Frontend', proficiency: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { id: 2, name: 'React.js', category: 'Frontend', proficiency: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { id: 3, name: 'ASP.NET', category: 'Backend', proficiency: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
    { id: 4, name: 'C#', category: 'Backend', proficiency: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
    { id: 5, name: 'Node.js', category: 'Backend', proficiency: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { id: 6, name: 'Laravel', category: 'Backend', proficiency: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
    { id: 7, name: 'VPS Server', category: 'Tools', proficiency: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' }
  ];

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Skill[]> {
    // return this.http.get<Skill[]>(this.apiUrl);
    return of(this.skills);
  }

  addSkill(skill: Skill): Observable<Skill> {
    // return this.http.post<Skill>(this.apiUrl, skill);
    this.skills.push(skill);
    return of(skill);
  }
}
