import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Constants } from 'src/app/config/constants';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  usuario: any;
  nombreUsuario: any;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private appComponent: AppComponent
  ) { 
    this.loadUsuario();
  }

  ngOnInit() {
  }

  loadUsuario() {

    this.storageService.get(Constants.AUTH).then(
      (res) => {
      
      this.usuario  = JSON.parse(res);
      console.log(this.usuario.person.name);
      let usuario = this.usuario.person.name + ' ' + this.usuario.person.lastname;
      this.appComponent.nombreUsuario = usuario;
      this.nombreUsuario = usuario;
      console.log(usuario);
       //this.personal = JSON.parse(res.value);
      // this.moduleTemperatura = false;
      // this.moduleRendicion = false;

      // console.log(this.appComponent.appPages);
      // this.appComponent.nombreUsuario = this.personal.NombreUsuario;
            
    });
    
  }

  goToEquipment() {
    this.router.navigateByUrl('/equipment');
  }

}
