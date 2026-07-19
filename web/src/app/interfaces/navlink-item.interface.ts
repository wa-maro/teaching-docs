import { UrlTree } from '@angular/router';

export type NavLinkItem = {
  url: string | UrlTree;
  icon: string;
  text: string;
};
