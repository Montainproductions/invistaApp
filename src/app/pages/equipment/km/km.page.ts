import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { InvistaService } from 'src/app/services/invista.service';
import { StorageService } from 'src/app/services/storage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-km',
  templateUrl: './km.page.html',
  styleUrls: ['./km.page.scss'],
  standalone: false
})
export class KmPage implements OnInit {

  //tabID = 'new';
  codeEquipment: any | undefined;
  user: any;
  Plate: any;
  kmEquipments: any = [];

  //allItems: any[] = []; // Lista completa de registros
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
    //this.loadMore();
  }

  ngOnInit() {
    console.log('ngOnInit');
    //this.loadData();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
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
    //const role_id = this.user.role_id;
    const company_id = this.user.company.id;
    const document = this.user.person.document;
    console.log(document, company_id, document);
    this.invistaService.listKmEquipment(document, company_id, this.codeEquipment).then(
      (res) => {
        if (res.data.status) {
          console.log('res:::', res.data.data)  
          const equipmentKms = res.data.data.equipmentKms;
          this.Plate = res.data.data.designatedEquipments[0].Plate;
          this.kmEquipments = equipmentKms;
          console.log(this.Plate);
          console.log(this.kmEquipments);

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

  addKm() {
    console.log('code:::', this.codeEquipment);
    let navigationExtrars: NavigationExtras = {
      state: {
        code: this.codeEquipment,
        plate: this.Plate
      }
    };
    this.router.navigateByUrl('/equipment/km/add-km', navigationExtrars);
  }

  editKm(id: any) {
    console.log('code:::', this.codeEquipment);
    let navigationExtrars: NavigationExtras = {
      state: {
        id: id,
        plate: this.Plate
      }
    };
    this.router.navigateByUrl('/equipment/km/edit-km', navigationExtrars);
  }

  loadMore() {
    const nextIndex = this.currentIndex + this.itemsPerPage;
    this.visibleItems = this.kmEquipments.slice(0, nextIndex); // Tomar los siguientes elementos
    this.currentIndex = nextIndex;

    // Ocultar el botón si ya no hay más elementos para cargar
    if (this.currentIndex >= this.kmEquipments.length) {
      this.hasMoreItems = false;
    }
  }

}
