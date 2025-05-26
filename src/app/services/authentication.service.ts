import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { Constants } from '../config/constants';
import { InvistaService } from './invista.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { loadingController } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isAuthenticated: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  token = '';

  constructor(
    private invistaService: InvistaService,
    private storageService: StorageService,
    private router: Router,
    private toastService: ToastService
  ) { 
    this.loadToken();
  }

  async loadToken() {
    const token = await this.storageService.get(Constants.AUTH);
    //console.log('token:::', token);
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
    //console.log(this.isAuthenticated);
  }

  async login(formData: any) {
    if (!formData) return;

    try {

      const loading = await loadingController.create({
        message: 'Validando...'
      });

      await loading.present();

      const response = await this.invistaService.login(formData);
      console.log('response:::', response.data.status);

      if (response && response.data.status) {

        if (response.data.status) {
          console.log(Constants.AUTH);
          console.log(response.data.data);
          this.storageService.set(Constants.AUTH, JSON.stringify(response.data.data))
          this.isAuthenticated.next(true);
          loading.dismiss();
          this.router.navigateByUrl('/home', { replaceUrl: true });  
        } else {
          loading.dismiss();
          this.toastService.presentToast(response.data.message);
        }
        
      } else {
        loading.dismiss();
        this.toastService.presentToast('Error al intentar ingresar, intente nuevamente.');
      }

    } catch (error) {
      return;
    }
  }

  async logout() {
    this.isAuthenticated.next(false);
    await this.storageService.remove(Constants.AUTH);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
