import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HeroSection, CreateHeroSection, UpdateHeroSection } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private endpoint = 'hero';

  constructor(private apiService: ApiService) { }

  /**
   * Get all hero sections
   */
  getAll(): Observable<HeroSection[]> {
    return this.apiService.get<HeroSection[]>(this.endpoint);
  }

  /**
   * Get hero section by ID
   */
  getById(id: number): Observable<HeroSection> {
    return this.apiService.getById<HeroSection>(this.endpoint, id);
  }

  /**
   * Create new hero section
   */
  create(data: CreateHeroSection): Observable<HeroSection> {
    const formData = new FormData();
    formData.append('greeting', data.greeting);
    formData.append('name', data.name);
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }
    return this.apiService.post<HeroSection>(this.endpoint, formData);
  }

  /**
   * Update hero section (full update)
   */
  update(id: number, data: UpdateHeroSection): Observable<HeroSection> {
    const formData = new FormData();
    formData.append('greeting', data.greeting);
    formData.append('name', data.name);
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }
    return this.apiService.put<HeroSection>(this.endpoint, id, formData);
  }

  /**
   * Patch hero section (partial update)
   */
  patch(id: number, data: Partial<UpdateHeroSection>): Observable<HeroSection> {
    // For patch, we might need more complex logic if we want to support file upload there too, 
    // but typically we use PUT for file updates or specific endpoints.
    // For now, let's keep it simple or remove it if not used. 
    // Given the user requirement, Create/Update is what matters.
    const formData = new FormData();
    if (data.greeting) formData.append('greeting', data.greeting);
    if (data.name) formData.append('name', data.name);
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);
    
    return this.apiService.patch<HeroSection>(this.endpoint, id, formData);
  }

  /**
   * Delete hero section
   */
  delete(id: number): Observable<any> {
    return this.apiService.delete(this.endpoint, id);
  }
}
