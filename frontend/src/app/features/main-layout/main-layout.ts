import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';
import { NavbarComponent } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="flex min-h-screen flex-col overflow-x-clip">
      <app-navbar></app-navbar>
      <main class="w-full flex-grow">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `
})
export class MainLayoutComponent {}
