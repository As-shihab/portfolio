import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../../core/services/hero.service';
import { HeroSection, UpdateHeroSection } from '../../../core/interfaces/hero.interface';

@Component({
  selector: 'app-hero-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './hero-admin.html',
  styleUrl: './hero-admin.css',
})
export class HeroAdminComponent implements OnInit {
  heroData: UpdateHeroSection = {
    greeting: "Hi, I'm",
    name: "Md Arafat Rahman",
    title: "Full Stack Developer",
    description: "I build amazing web applications."
  };

  heroId: number | null = null;
  loading = false;
  error = '';
  success = '';
  selectedFile: File | null = null;
  currentImageUrl: string | null = null;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.loadHeroData();
  }

  /**
   * Handle file selection
   */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.heroData.image = file;
    }
  }

  /**
   * Load hero data from API
   */
  loadHeroData() {
    this.loading = true;
    this.error = '';

    this.heroService.getAll().subscribe({
      next: (heroes) => {
        if (heroes && heroes.length > 0) {
          // Get the first hero section
          const hero = heroes[0];
          this.heroId = hero.id;
          this.currentImageUrl = hero.imageUrl || null;
          this.heroData = {
            greeting: hero.greeting,
            name: hero.name,
            title: hero.title,
            description: hero.description
          };
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading hero data', err);
        this.error = 'Failed to load hero data';
        this.loading = false;
      }
    });
  }

  /**
   * Save hero data (create or update)
   */
  saveHero() {
    if (!this.heroData.greeting || !this.heroData.name || !this.heroData.title || !this.heroData.description) {
      this.error = 'All fields are required';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    if (this.heroId) {
      // Update existing hero
      this.heroService.update(this.heroId, this.heroData).subscribe({
        next: (response) => {
          console.log('Hero updated successfully', response);
          this.loading = false;
          this.success = 'Hero section updated successfully!';
          if (response.imageUrl) {
            this.currentImageUrl = response.imageUrl;
          }
          this.selectedFile = null; // Reset selected file
          setTimeout(() => this.success = '', 3000);
        },
        error: (err) => {
          console.error('Error updating hero', err);
          this.loading = false;
          this.error = err.error?.message || 'Failed to update hero section';
        }
      });
    } else {
      // Create new hero
      this.heroService.create(this.heroData).subscribe({
        next: (response) => {
          console.log('Hero created successfully', response);
          this.heroId = response.id;
          this.heroId = response.id;
          this.loading = false;
          this.success = 'Hero section created successfully!';
          if (response.imageUrl) {
            this.currentImageUrl = response.imageUrl;
          }
          this.selectedFile = null; // Reset selected file
          setTimeout(() => this.success = '', 3000);
        },
        error: (err) => {
          console.error('Error creating hero', err);
          this.loading = false;
          this.error = err.error?.message || 'Failed to create hero section';
        }
      });
    }
  }

  /**
   * Delete hero section
   */
  deleteHero() {
    if (!this.heroId) {
      this.error = 'No hero section to delete';
      return;
    }

    if (!confirm('Are you sure you want to delete this hero section?')) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.heroService.delete(this.heroId).subscribe({
      next: () => {
        console.log('Hero deleted successfully');
        this.heroId = null;
        this.heroData = {
          greeting: "Hi, I'm",
          name: "Md Arafat Rahman",
          title: "Full Stack Developer",
          description: "I build amazing web applications."
        };
        this.loading = false;
        this.success = 'Hero section deleted successfully!';
        setTimeout(() => this.success = '', 3000);
      },
      error: (err) => {
        console.error('Error deleting hero', err);
        this.loading = false;
        this.error = err.error?.message || 'Failed to delete hero section';
      }
    });
  }
}
