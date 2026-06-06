import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AboutComponent } from '../about/about';
import { SkillsComponent } from '../skills/skills';
import { ProjectsComponent } from '../projects/projects';
import { ExperienceComponent } from '../experience/experience';
import { ContactComponent } from '../contact/contact';
@Component({
  selector: 'app-home',
  imports: [AboutComponent, SkillsComponent, ProjectsComponent, ExperienceComponent, ContactComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  readonly videos: { title: string; description: string; embedUrl: SafeResourceUrl }[];

  constructor(private sanitizer: DomSanitizer) {
    this.videos = [
      {
        title: 'ERP Workflow Demo',
        description: 'A walkthrough of ERP features and implementation flow.',
        embedUrl: 'https://www.youtube.com/embed/FpjrlrB6QHI?start=5',
      },
      {
        title: 'Project Demo',
        description: 'A focused project showcase with practical system behavior.',
        embedUrl: 'https://www.youtube.com/embed/a4SmTZltYfU?start=63',
      },
      {
        title: 'Software Demo',
        description: 'A video overview of delivered software work and interactions.',
        embedUrl: 'https://www.youtube.com/embed/uht5Nc9Fafs?start=23',
      },
    ].map((video) => ({
      ...video,
      embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(video.embedUrl),
    }));
  }
}
