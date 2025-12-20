import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from '../../../app.routes';
import { SidebarMenuItem } from '../../components/sidebar-menu-item/sidebar-menu-item';

@Component({
  selector: 'app-dasboard-layout',
  imports: [CommonModule, RouterModule, SidebarMenuItem],
  templateUrl: './dasboard-layout.html',
  styles: ``,
})
export class DasboardLayout {
  public routes = routes[0].children?.filter((route) => route.data) || [];
}
