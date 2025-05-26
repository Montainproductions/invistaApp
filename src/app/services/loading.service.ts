import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    public loadingController: LoadingController
  ) { }

  show(message: string) {
    this.loadingController.create({
      message: message
    }).then(
      (res) => {
        res.present();
      }
    );
  }

  hide() {
    this.loadingController.dismiss().then(
      (res) => {
        console.log('Loading dismissed:::', res);
      }
    ).catch(
      (error) => {
        console.log('error:::', error);
      }
    )
  }
}
