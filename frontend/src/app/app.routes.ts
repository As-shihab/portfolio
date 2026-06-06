import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { AboutAdminComponent } from './features/admin/about-admin/about-admin';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout';
import { BlogAdminComponent } from './features/admin/blog-admin/blog-admin';
import { DashboardComponent } from './features/admin/dashboard/dashboard';
import { HeroAdminComponent } from './features/admin/hero-admin/hero-admin';
import { LoginComponent } from './features/admin/login/login';
import { PortfolioAdminComponent } from './features/admin/portfolio-admin/portfolio-admin';
import { HomeComponent } from './features/home/home';
import { MainLayoutComponent } from './features/main-layout/main-layout';

export const routes: Routes = [
  // Public Routes wrapped in MainLayout
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', redirectTo: '', pathMatch: 'full' },
      { path: 'skills', redirectTo: '', pathMatch: 'full' },
      { path: 'videos', redirectTo: '', pathMatch: 'full' },
      { path: 'projects', redirectTo: '', pathMatch: 'full' },
      { path: 'experience', redirectTo: '', pathMatch: 'full' },
      { path: 'problem-solving', redirectTo: '', pathMatch: 'full' },
      { path: 'contact', redirectTo: '', pathMatch: 'full' },
      { path: 'certificates', redirectTo: '', pathMatch: 'full' },
    ]
  },
  
  // Admin Login (Standalone)
  { path: 'admin/login', component: LoginComponent },

  // Admin Routes wrapped in AdminLayout
  { 
    path: 'admin', 
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'hero', component: HeroAdminComponent },
      { path: 'about', component: AboutAdminComponent },
      { path: 'portfolio', component: PortfolioAdminComponent },
      { path: 'blog', component: BlogAdminComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: '' }
];
