import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  avatarUrl: string;
  socialLinks: { platform: string; url: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // Mock data for now, replace with HttpClient call later
  private mockProfile: Profile = {
    name: 'Abdus Salam Shihab',
    title: 'Software Developer',
    bio: `Software Developer focused on ERP and MES products, Electron desktop systems, Angular and React frontends, and backend services with Node.js, Laravel, NestJS, Prisma, and OData v4.`,
    email: 'study.shihab@gmail.com',
    location: 'Dhaka, Bangladesh',
    avatarUrl: 'assets/shihab.jpg',
    socialLinks: [
      { platform: 'Website', url: 'https://shihab.aptigen.net' },
      { platform: 'GitHub', url: 'https://github.com' },
      { platform: 'LinkedIn', url: 'https://linkedin.com' }
    ]
  };

  constructor() { }

  getProfile(): Observable<Profile> {
    // In a real app: return this.http.get<Profile>(`${environment.api}/profile`);
    return of(this.mockProfile);
  }
}
