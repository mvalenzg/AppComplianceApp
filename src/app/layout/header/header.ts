import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-header',
  imports: [AvatarModule, ToolbarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
