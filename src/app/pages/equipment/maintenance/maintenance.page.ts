import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { InvistaService } from 'src/app/services/invista.service';
import { StorageService } from 'src/app/services/storage.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
  standalone: false
})
export class MaintenancePage implements OnInit {

  codeEquipment: any | undefined;
  user: any;
  maintenanceEquipments: any = [];
  Plate: any;
  kmEquipments: any = [];

  visibleItems: any[] = []; // Registros visibles en la lista
  itemsPerPage: number = 5; // Cantidad de registros por carga
  currentIndex: number = 0; // Índice actual de registros cargados
  hasMoreItems: boolean = true; // Indica si hay más registros por cargar

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private navController: NavController,
    private storageService: StorageService,
    private invistaService: InvistaService,
    private datePipe: DatePipe
  ) { 
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.codeEquipment = navigation.extras.state['code'] ?? '';
      } 
      console.log(this.codeEquipment);
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
        this.loadData();
      }
      
      async loadData() {
          const token = await this.storageService.get(Constants.AUTH);
          var data = JSON.parse(token); console.log(data);
          this.user = data;
          this.listKmEquipments();
      }
    
      getFormattedDate(fecha: string): string | null {
        return this.datePipe.transform(fecha, 'dd/MM/yyyy');
      }

      listKmEquipments() {
        const role_id = this.user.role_id;
        const company_id = this.user.company.id;
        const document = this.user.person.document;
        console.log(role_id, company_id, document);
        this.invistaService.listMaintenanceEquipment(role_id, company_id, this.codeEquipment, document).then(
          (res) => {
            if (res.data.status) {
              console.log('res:::', res.data.data)  
              const equipmentMaintenances = res.data.data.equipmentMantos;
              this.Plate = res.data.data.designatedEquipments[0].Plate;
              this.maintenanceEquipments = equipmentMaintenances;
              this.loadMore();
            }
          },
          (error) => {
            console.log(error);
          }
        )
      }
    
      goBack() {
        this.router.navigateByUrl('/equipment');
      }

  addMaintenance() {
    console.log('code:::', this.codeEquipment);
    let navigationExtrars: NavigationExtras = {
      state: {
        code: this.codeEquipment,
        plate: this.Plate
      }
    };
    this.router.navigateByUrl('/equipment/maintenance/add-maintenance', navigationExtrars);
  }

  editMaintenance(id: any) {
    console.log('code:::', this.codeEquipment);
    let navigationExtrars: NavigationExtras = {
      state: {
        id: id,
        plate: this.Plate
      }
    };
    this.router.navigateByUrl('/equipment/maintenance/edit-maintenance', navigationExtrars);
  }

  loadMore() {
    const nextIndex = this.currentIndex + this.itemsPerPage;
    this.visibleItems = this.maintenanceEquipments.slice(0, nextIndex); // Tomar los siguientes elementos
    this.currentIndex = nextIndex;

    // Ocultar el botón si ya no hay más elementos para cargar
    if (this.currentIndex >= this.maintenanceEquipments.length) {
      this.hasMoreItems = false;
    }
  }
}
