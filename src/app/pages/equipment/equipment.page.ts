import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { InvistaService } from 'src/app/services/invista.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.page.html',
  styleUrls: ['./equipment.page.scss'],
  standalone: false,
})
export class EquipmentPage implements OnInit {

  user: any;
  equipments: any = [];

  constructor(
    private invistaService: InvistaService,
    private router: Router,
    public storageService: StorageService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadData();
  }

  async loadData() {
    const token = await this.storageService.get(Constants.AUTH);
    var data = JSON.parse(token); console.log(data);
    this.user = data;
    this.listEquipments();
  }

  listEquipments() {
    const role_id = this.user.role_id;
    const company_id = this.user.company.id;
    const document = this.user.person.document;
    const name = this.user.person.name;
    const lastname = this.user.person.lastname;
    console.log(role_id, company_id, document);
    this.invistaService.listEquipments(role_id, document).then(
      (res) => {
        if (res.data.status) {
          console.log('res:::', res.data.data.designatedEquipments)  
          const designatedEquipments = res.data.data.designatedEquipments;
          const filteredEquipments = designatedEquipments.filter((e: {}) => e && typeof e === 'object' && Object.keys(e).length > 0);
          this.equipments = filteredEquipments;
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  goToKm(code: any) {
    console.log('code:::', code);
    let navigationExtrars: NavigationExtras = {
      state: {
        code: code
      }
    };
    this.router.navigateByUrl('/equipment/km', navigationExtrars);
  }

  goToFuel(code: any) {
    console.log('code:::', code);
    let navigationExtrars: NavigationExtras = {
      state: {
        code: code
      }
    };
    this.router.navigateByUrl('/equipment/fuel', navigationExtrars);
  }

  goToMaintenance(code: any) {
    console.log('code:::', code);
    let navigationExtrars: NavigationExtras = {
      state: {
        code: code
      }
    };
    this.router.navigateByUrl('/equipment/maintenance', navigationExtrars);
  }

  addKm(code: any, plate: any) {
    console.log('code:::', code);
    let navigationExtrars: NavigationExtras = {
      state: {
        code: code,
        plate: plate
      }
    };
    this.router.navigateByUrl('/equipment/km/add-km', navigationExtrars);
  }

  addFuel(code: any, plate: any) {
    console.log('code:::', code);
  let navigationExtrars: NavigationExtras = {
    state: {
      code: code,
      plate: plate
    }
  };
  this.router.navigateByUrl('/equipment/fuel/add-fuel', navigationExtrars);
  }

  addMaintenance(code: any, plate: any) {
    console.log('code:::', code);
    let navigationExtrars: NavigationExtras = {
      state: {
        code: code,
        plate: plate
      }
    };
    this.router.navigateByUrl('/equipment/maintenance/add-maintenance', navigationExtrars);
  }
}
