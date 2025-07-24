import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

import { Filesystem, Directory } from '@capacitor/filesystem';

//await Filesystem.requestPermissions();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})

export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Equipos', url: '/equipment', icon: 'star' },
    { title: 'Tipos de Inspecciones', url: '/APICalls', icon: 'star' },
  ];

  public nombreUsuario : any = '';
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  async logout() {
    await this.authenticationService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}