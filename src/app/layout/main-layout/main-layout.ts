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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Sidebar } from '../sidebar';
import { Header } from '../header';
import { Footer } from '../footer/footer';
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
    LoadingSpiner,
    ConfirmDialogModule,
    Sidebar,
    Header,
    Footer,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {
  sidebarVisible: boolean = true;
  menuItems: MenuItem[] = [];

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Dashboard', icon: 'pi pi-chart-scatter', routerLink: '/dashboard' ,
      },
      {
        label: 'Aplicaciones', icon: 'pi pi-th-large', routerLink: '/applications',
      },
      {
        label: 'Catálogos',
        icon: 'pi pi-list',
        items: [
          { label: 'Sitios', icon: 'pi pi-building', routerLink: '/catalogs/sites' },
          { label: 'Devs', icon: 'pi pi-users', routerLink: '/catalogs/devs' },
        ],
      },
      { label: 'Administración', icon: 'pi pi-cog', routerLink: '/admin' },
    ];
  }
}
