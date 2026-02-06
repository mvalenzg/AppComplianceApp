import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { LoadingSpiner } from '../../shared/components/loading-spiner/loading-spiner';

@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    ToolbarModule,
    AvatarModule,
    PanelMenuModule,
    InputTextModule,
    MessageModule,
    ToastModule,
    LoadingSpiner
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {
  sidebarVisible: boolean = true;
  menuItems: MenuItem[] = [];

  ngOnInit() {
    this.menuItems = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard', expanded: false },
      {
        label: 'Aplicaciones',
        icon: 'pi pi-th-large',
        routerLink: '/applications',
        expanded: false,
      },
      {
        label: 'Catálogos',
        icon: 'pi pi-list',
        items: [
          { label: 'Sitios', icon: 'pi pi-factory', routerLink: '/catalogs/sites' },
          { label: 'Devs', icon: 'pi pi-users', routerLink: '/catalogs/devs' },
        ],
      },
      { label: 'Administración', icon: 'pi pi-cog', routerLink: '/admin' },
    ];
  }
}
