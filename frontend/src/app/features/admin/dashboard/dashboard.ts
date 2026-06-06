import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project, ProjectsService } from '../../../core/services/projects';
import { Skill, SkillsService } from '../../../core/services/skills';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  showSkillModal = false;
  showProjectModal = false;

  newSkill: Skill = { id: 0, name: '', category: 'Frontend', proficiency: 50 };
  newProject: Project = { id: 0, title: '', description: '', imageUrl: '', technologies: [], category: 'Website' };
  projectTechInput = '';

  constructor(
    private skillsService: SkillsService,
    private projectsService: ProjectsService
  ) {}

  openSkillModal() {
    this.showSkillModal = true;
  }

  closeSkillModal() {
    this.showSkillModal = false;
  }

  addSkill() {
    this.skillsService.addSkill(this.newSkill).subscribe({
      next: (res) => {
        alert('Skill added successfully!');
        this.closeSkillModal();
        this.newSkill = { id: 0, name: '', category: 'Frontend', proficiency: 50 };
      },
      error: (err) => alert('Failed to add skill')
    });
  }

  openProjectModal() {
    this.showProjectModal = true;
  }

  closeProjectModal() {
    this.showProjectModal = false;
  }

  addProject() {
    this.newProject.technologies = this.projectTechInput.split(',').map(t => t.trim());
    this.projectsService.addProject(this.newProject).subscribe({
      next: (res) => {
        alert('Project added successfully!');
        this.closeProjectModal();
        this.newProject = { id: 0, title: '', description: '', imageUrl: '', technologies: [], category: 'Website' };
        this.projectTechInput = '';
      },
      error: (err) => alert('Failed to add project')
    });
  }
}
