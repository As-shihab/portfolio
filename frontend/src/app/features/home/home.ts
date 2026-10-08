import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RevealDirective } from '../../shared/directives/reveal';
import { AboutComponent } from '../about/about';
import { ContactComponent } from '../contact/contact';
import { ExperienceComponent } from '../experience/experience';
import { ProjectsComponent } from '../projects/projects';

@Component({
  selector: 'app-home',
  imports: [AboutComponent, ProjectsComponent, ExperienceComponent, ContactComponent, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  /** Words cycled in the hero headline. */
  readonly heroWords = ['factories', 'shop floors', 'warehouses', 'plants', 'supershops'];
  readonly wordIndex = signal(0);
  private wordTimer?: ReturnType<typeof setInterval>;

  readonly socials = [
    { label: 'GitHub', url: 'https://github.com/As-shihab' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/as-shihab/' },
    { label: 'Email', url: 'mailto:study.shihab@gmail.com' },
  ];

  readonly stackGroups = [
    { title: 'Frontend', items: ['Angular', 'React', 'Next.js', 'SAP UI5', 'Tailwind CSS', 'Electron'] },
    { title: 'Backend', items: ['Node.js', 'NestJS', 'Laravel', 'Express', 'Prisma', 'OData v4'] },
    { title: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis', 'SAP HANA'] },
    { title: 'Servers & IoT', items: ['Linux VPS', 'AWS EC2', 'CI/CD', 'WebSocket', 'Modbus', 'Arduino'] },
  ];

  readonly aiStack = {
    note: 'LLM features and agents for business data: chat that can look things up in your ERP, search across documents, and multi-step workflows that call real tools.',
    items: [
      { name: 'LangChain', detail: 'Chains, tools and retrieval' },
      { name: 'LangGraph', detail: 'Multi-step, stateful agents' },
      { name: 'Qdrant', detail: 'Vector search for RAG' },
      { name: 'LLMs', detail: 'OpenAI-compatible APIs and local models' },
      { name: 'Ollama', detail: 'Running models on our own servers' },
      { name: 'RAG', detail: 'Answers grounded in company data' },
    ],
  };

  readonly videos: { title: string; description: string; embedUrl: SafeResourceUrl }[];

  constructor(private sanitizer: DomSanitizer) {
    this.videos = [
      {
        title: 'ERP workflow',
        description: 'Walking through a full ERP flow, start to finish.',
        embedUrl: 'https://www.youtube.com/embed/FpjrlrB6QHI?start=5',
      },
      {
        title: 'Project demo',
        description: 'One of the projects running the way it does day to day.',
        embedUrl: 'https://www.youtube.com/embed/a4SmTZltYfU?start=63',
      },
      {
        title: 'Software tour',
        description: 'A quick tour of a finished app and how people use it.',
        embedUrl: 'https://www.youtube.com/embed/uht5Nc9Fafs?start=23',
      },
    ].map((video) => ({
      ...video,
      embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(video.embedUrl),
    }));
  }

  ngOnInit(): void {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.wordTimer = setInterval(
      () => this.wordIndex.update((i) => (i + 1) % this.heroWords.length),
      2600
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.wordTimer);
  }
}
