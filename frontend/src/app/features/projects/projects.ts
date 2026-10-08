import { Component, computed, OnInit, signal } from '@angular/core';
import { Project, ProjectsService } from '../../core/services/projects';
import { RevealDirective } from '../../shared/directives/reveal';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent implements OnInit {
  projects = signal<Project[]>([]);
  selectedCategory = signal<string>('All');

  readonly categoryLabels: Record<string, string> = {
    Desktop: 'Desktop',
    Website: 'Web',
    Mobile: 'Mobile',
    Other: 'Backend & IoT',
  };

  /** Featured product I founded — details from aptigen.net. */
  readonly aptigen = {
    modules: [
      'HR', 'Sales & invoicing', 'Accounting', 'Inventory', 'Purchase orders', 'Restaurant POS',
      'Hotel stays', 'Live marketplace', 'B2B portal', 'Job board', 'Device management',
      'Real-time chat', 'Kanban notes', 'Audit logs',
    ],
    links: [
      { label: 'aptigen.net', url: 'https://aptigen.net' },
      { label: 'Live demo', url: 'https://erp.aptigen.net' },
      { label: 'B2B marketplace', url: 'https://b2b.aptigen.net' },
    ],
  };

  categories = computed(() => [
    'All',
    ...new Set(this.projects().map((p) => p.category)),
  ]);

  filteredProjects = computed(() => {
    const category = this.selectedCategory();
    const projects = this.projects();
    return category === 'All' ? projects : projects.filter((p) => p.category === category);
  });

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe({
      next: (data) => this.projects.set(data),
      error: (err) => console.error('Failed to load projects', err),
    });
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  label(category: string): string {
    return category === 'All' ? 'All' : this.categoryLabels[category] ?? category;
  }
}
