import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { InvistaService } from 'src/app/services/invista.service';
import { StorageService } from 'src/app/services/storage.service';
import { CommonModule } from '@angular/common';

/*@Component({
  selector: 'app-equipment',
  templateUrl: './APICalls.page.html',
  styleUrls: ['./APICalls.page.scss'],
  imports: [IonButton, IonContent, IonPopover],
})*/
@Component({
  selector: 'app-equipment',
  templateUrl: './APICalls.page.html',
  styleUrls: ['./APICalls.page.scss'],
  standalone: false,
})
export class APICallsPage implements OnInit {
    user: any;
    equipments: any = [];

    constructor(
        private invistaService: InvistaService,
        private router: Router,
        public storageService: StorageService
    ) { }

    ngOnInit() {
    }
}