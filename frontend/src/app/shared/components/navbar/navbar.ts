import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  isDarkMode = true;
  isMobileMenuOpen = false;
  isScrolled = false;
  activeSection = 'home';
  readonly navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'videos', label: 'Videos' },
    { id: 'contact', label: 'Contact' },
  ];
  private observer?: IntersectionObserver;

  constructor() {
    const storedTheme = localStorage.getItem('theme');
    this.isDarkMode = storedTheme ? storedTheme === 'dark' : true;
    this.applyTheme();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.observeSections();
      this.scrollToInitialHash();
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 24;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  scrollToSection(sectionId: string, event?: Event): void {
    event?.preventDefault();
    const section = document.getElementById(sectionId);

    if (!section) {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const top = section.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: 'smooth' });
    history.replaceState(null, '', sectionId === 'home' ? window.location.pathname : `#${sectionId}`);
    this.activeSection = sectionId;
    this.closeMobileMenu();
  }

  private observeSections(): void {
    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          this.activeSection = visible.target.id;
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    ['home', ...this.navItems.map((item) => item.id)].forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        this.observer?.observe(section);
      }
    });
  }

  private scrollToInitialHash(): void {
    const sectionId = window.location.hash.replace('#', '');
    if (sectionId && document.getElementById(sectionId)) {
      this.scrollToSection(sectionId);
    }
  }
}
