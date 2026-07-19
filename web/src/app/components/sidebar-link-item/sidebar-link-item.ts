import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavLinkItem } from '../../interfaces/navlink-item.interface';

@Component({
  selector: 'app-sidebar-link-item',
  imports: [MatListItem, RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './sidebar-link-item.html',
  styleUrl: './sidebar-link-item.css',
})
export class SidebarLinkItem {
  navLinkItem = input.required<NavLinkItem>();
}
