import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { NavLinkItem } from '../../interfaces/navlink-item.interface';
import { SidebarNav } from '../../components/sidebar-nav/sidebar-nav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, MatSidenavModule, MatToolbar, MatIcon, MatIconButton, SidebarNav],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  protected title = '';
  protected links: NavLinkItem[] = [
    {
      url: '/admin/dashboard',
      icon: 'dashboard',
      text: 'Dashboard',
    },
    {
      url: '/admin/subjects',
      icon: 'menu_book',
      text: 'Subjects',
    },
  ];

  protected isMobile = signal(false);
  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        this.isMobile.set(result.matches);
      });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      let currentRoute = this.route;

      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }

      this.title = currentRoute.snapshot.data['title'] ?? '';
    });
  }
}
