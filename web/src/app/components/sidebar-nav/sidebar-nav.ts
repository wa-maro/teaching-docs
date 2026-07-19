import { MatNavList } from '@angular/material/list';
import { Component, input } from '@angular/core';
import { SidebarLinkItem } from '../sidebar-link-item/sidebar-link-item';
import { NavLinkItem } from '../../interfaces/navlink-item.interface';

@Component({
  selector: 'app-sidebar-nav',
  imports: [MatNavList, SidebarLinkItem],
  templateUrl: './sidebar-nav.html',
  styleUrl: './sidebar-nav.css',
})
export class SidebarNav {
  links = input.required<NavLinkItem[]>();
}
