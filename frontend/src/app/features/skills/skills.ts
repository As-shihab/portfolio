import { Component, OnInit, signal, ElementRef, AfterViewInit } from '@angular/core';
import { Skill, SkillsService } from '../../core/services/skills';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class SkillsComponent implements OnInit, AfterViewInit {
  skills = signal<Skill[]>([]);
  isViewed = signal<boolean>(false);
  animationProgress = signal<number>(0);
  readonly categories: Skill['category'][] = ['Tools', 'Other'];

  constructor(
    private skillsService: SkillsService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe({
      next: (data) => this.skills.set(data),
      error: (err) => console.error('Failed to load skills', err)
    });
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.isViewed.set(true);
        this.animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.4 }); // Trigger when 40% visible

    observer.observe(this.el.nativeElement);
  }

  private animateCounters(): void {
    const duration = 4000; // 4 seconds for a really slow fill
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Matching the CSS cubic-bezier(0.1, 0, 0.3, 1) roughly with a custom ease
      const easeProgress = 1 - Math.pow(1 - progress, 2.5);
      
      this.animationProgress.set(easeProgress);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  getDisplayValue(target: number): number {
    return Math.round(target * this.animationProgress());
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills()
      .filter((s) => s.category === category)
      .sort((a, b) => b.proficiency - a.proficiency);
  }

  getTopSkills(limit = 4): Skill[] {
    return [...this.skills()]
      .sort((a, b) => b.proficiency - a.proficiency)
      .slice(0, limit);
  }

  getAverageByCategory(category: Skill['category']): number {
    const items = this.getSkillsByCategory(category);
    if (!items.length) {
      return 0;
    }

    const total = items.reduce((sum, item) => sum + item.proficiency, 0);
    return Math.round(total / items.length);
  }

  getOverallAverage(): number {
    const items = this.skills();
    if (!items.length) {
      return 0;
    }

    const total = items.reduce((sum, item) => sum + item.proficiency, 0);
    return Math.round(total / items.length);
  }

  getStrongestCategory(): Skill['category'] {
    const categoryScores = this.categories
      .map((category) => ({
        category,
        score: this.getAverageByCategory(category),
      }))
      .sort((a, b) => b.score - a.score);

    return categoryScores[0]?.category ?? 'Tools';
  }

  getSkillTone(proficiency: number): string {
    if (proficiency >= 85) return 'Expert';
    if (proficiency >= 70) return 'Advanced';
    if (proficiency >= 55) return 'Intermediate';
    return 'Learning';
  }
}
