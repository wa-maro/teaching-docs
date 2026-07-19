import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLinkItem } from './sidebar-link-item';

describe('SidebarLinkItem', () => {
  let component: SidebarLinkItem;
  let fixture: ComponentFixture<SidebarLinkItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarLinkItem],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarLinkItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
