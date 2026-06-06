import { Component, computed, OnInit, signal } from '@angular/core';
import { Project, ProjectsService } from '../../core/services/projects';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent implements OnInit {
  projects = signal<Project[]>([]);
  categories = ['All', 'Website', 'Mobile'];
  selectedCategory = signal<string>('All');

  filteredProjects = computed(() => {
    const category = this.selectedCategory();
    const projects = this.projects();
    if (category === 'All') {
      return projects;
    }
    return projects.filter(p => p.category === category);
  });

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe({
      next: (data) => this.projects.set(data),
      error: (err) => console.error('Failed to load projects', err)
    });
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
