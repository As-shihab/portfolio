import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  isDarkMode = true;
  isMobileMenuOpen = false;
  activeSection = 'home';
  readonly navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'videos', label: 'Videos' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
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

    const top = section.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
    history.replaceState(null, '', sectionId === 'home' ? window.location.pathname : `#${sectionId}`);
    this.activeSection = sectionId;
    this.closeMobileMenu();
  }

  linkClass(sectionId: string): string {
    const base = 'text-secondary dark:text-gray-300 hover:text-brand dark:hover:text-emerald-400 transition';
    const active = 'text-brand dark:text-emerald-400 font-semibold';
    return this.activeSection === sectionId ? `${base} ${active}` : base;
  }

  mobileLinkClass(sectionId: string): string {
    const base = 'block px-3 py-2 rounded-md text-base font-medium text-secondary dark:text-gray-200 hover:text-brand dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition';
    const active = 'text-brand dark:text-emerald-400 bg-emerald-50 dark:bg-gray-700';
    return this.activeSection === sectionId ? `${base} ${active}` : base;
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

    this.navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        this.observer?.observe(section);
      }
    });
  }

  private scrollToInitialHash(): void {
    const sectionId = window.location.hash.replace('#', '');
    if (sectionId && this.navItems.some((item) => item.id === sectionId)) {
      this.scrollToSection(sectionId);
    }
  }
}
