import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, IonDatetime, LoadingController, NavController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { InvistaService } from 'src/app/services/invista.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string,
  path: string,
  data: string
}

@Component({
  selector: 'app-edit-maintenance',
  templateUrl: './edit-maintenance.page.html',
  styleUrls: ['./edit-maintenance.page.scss'],
  standalone: false
})
export class EditMaintenancePage implements OnInit {

  public maintenanceForm: FormGroup | any;
  errorMsg: string[] = [];
  isSubmitted = false;
  image: LocalFile | undefined;
  imagenUrl : any;
  hasImage: boolean = false;

  showPicker = false;
  dateValueFrom = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'
  dateValueTo = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'
  formattedStringFrom = '';
  formattedStringTo = '';
  @ViewChild(IonDatetime) datetimefrom: IonDatetime | undefined;
  @ViewChild(IonDatetime) datetimeto: IonDatetime | undefined;

  maintenanceEquipment: any;
  codeEquipment: any | undefined;
  idEquipment: any | undefined;
  plate: any | undefined;
  serverBase64Data : any = '';

  constructor(
    public formBuilder: FormBuilder,
    private navController: NavController,
    private router: Router,
    private route: ActivatedRoute, 
    private invistaService: InvistaService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    public actionSheetController: ActionSheetController,
    private loadingController: LoadingController
  ) { 
    this.setToday();
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        console.log(navigation.extras);
        this.idEquipment = navigation.extras.state['id'] ?? '';
        this.plate = navigation.extras.state['plate'] ?? '';
      } 
      console.log(this.idEquipment, this.plate);
      this.getEquipmentMaintenance();
    });
  }

  ngOnInit() {
    this.maintenanceForm = this.formBuilder.group({
      Nr: new FormControl(this.idEquipment, Validators.compose([
        Validators.required,
      ])),
      code: new FormControl(this.codeEquipment, Validators.compose([
        Validators.required,
      ])),
      provider: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      service: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      from: new FormControl(this.formattedStringFrom, Validators.compose([
        Validators.required,
      ])),
      to: new FormControl(this.formattedStringTo, Validators.compose([
        Validators.required,
      ])),
      kmInicio: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      kmFinal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      costHand: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      costPieces: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      image: new FormControl('', [])
    })
  }

  getEquipmentMaintenance() {
    this.invistaService.findEquipmentMaintenance(this.idEquipment).then(
      (res) => {
        console.log('res:::', res.data.data);
        this.maintenanceEquipment = res.data.data.equipmentmanto;

        // this.km = this.kmEquipment.Km;
        this.codeEquipment = this.maintenanceEquipment.EquipmentCode;
        
        if (typeof this.maintenanceEquipment.From === 'string') {
          this.maintenanceEquipment.From = new Date(this.maintenanceEquipment.From + 'T00:00:00');
        }

        if (this.maintenanceEquipment.From instanceof Date && !isNaN(this.maintenanceEquipment.From.getTime())) {
          this.formattedStringFrom = format(this.maintenanceEquipment.From, 'dd/MM/yyyy');
        } 

        if (typeof this.maintenanceEquipment.To === 'string') {
          this.maintenanceEquipment.To = new Date(this.maintenanceEquipment.To + 'T00:00:00');
        }

        if (this.maintenanceEquipment.To instanceof Date && !isNaN(this.maintenanceEquipment.To.getTime())) {
          this.formattedStringTo = format(this.maintenanceEquipment.To, 'dd/MM/yyyy');
        } 
        console.log(this.formattedStringFrom, this.formattedStringTo);
        // //this.formattedString = format(parseISO(this.kmEquipment.DateEntry), 'dd/MM/yyyy');

        if (this.maintenanceEquipment.image) {
          this.hasImage = true;
          this.imagenUrl = `https://app.invista.pe/public/assets/uploads/${this.maintenanceEquipment.image}`  
        }

        this.maintenanceForm.patchValue({
          code: this.codeEquipment,
          provider: this.maintenanceEquipment.Provider,
          service: this.maintenanceEquipment.Service,
          description: this.maintenanceEquipment.Description,
          from: this.formattedStringFrom,
          to: this.formattedStringTo,
          kmInicio: this.maintenanceEquipment.Km_from,
          kmFinal: this.maintenanceEquipment.Km,
          costHand: this.maintenanceEquipment.Cost_ManoObra,
          costPieces: this.maintenanceEquipment.Cost_Piezas,

        });

        
      }
    )
  }

  validation_messages = {
      'code': [
        { type: 'required', message: 'Ingresa el código de equipo'},
      ],
      'provider': [
        { type: 'required', message: 'Ingrese la fecha'},
      ],
      'service': [
        { type: 'required', message: 'Ingrese el km'},
      ],
      'description': [
        { type: 'required', message: 'Ingrese el km'},
      ],
      'from': [
        { type: 'required', message: 'Ingrese el km'},
      ],
      'to': [
        { type: 'required', message: 'Ingrese el km'},
      ],
      'kmInicio': [
        { type: 'required', message: 'Ingrese el km'},
      ],
      'kmFinal': [
        { type: 'required', message: 'Ingrese el km'},
      ],
      'costHand': [
        { type: 'required', message: 'Ingrese el km'},
      ],
      'costPieces': [
        { type: 'required', message: 'Ingrese el km'},
      ],
    }
  
    setToday() {
      this.formattedStringFrom = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'), 'dd/MM/yyyy');
      this.formattedStringTo = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'), 'dd/MM/yyyy');
    }
      
    dateChangedFrom(value: any) {
      console.log(value);
      this.dateValueFrom = value;
      this.formattedStringFrom = format(parseISO(value), 'dd/MM/yyyy');
      this.maintenanceForm.patchValue({ from: this.formattedStringFrom });
      this.showPicker = false;
    }
  
    dateChangedTo(value: any) {
      console.log(value);
      this.dateValueTo = value;
      this.formattedStringTo = format(parseISO(value), 'dd/MM/yyyy');
      this.maintenanceForm.patchValue({ to: this.formattedStringTo });
      this.showPicker = false;
    }
      
    closefrom() {
      this.datetimefrom?.cancel(true);
    }
      
    selectfrom() {
      this.datetimefrom?.confirm(true);
    }
  
    closeto() {
      this.datetimeto?.cancel(true);
    }
      
    selectto() {
      this.datetimeto?.confirm(true);
    }
      
    goBack() {
      this.navController.back()
    }
  
    async registerMaintenanceEquipment() {
      console.log(this.maintenanceForm.value);
      this.isSubmitted = true;
      if (!this.maintenanceForm?.valid) return;
      console.log(this.maintenanceForm.value);
  
      this.loadingService.show('Guardando...');
  
      let pathImage = this.serverBase64Data;
      this.maintenanceForm.value.image = pathImage;
  
      await this.invistaService.updateMaintenanceEquipment(this.maintenanceForm.value).then(
        (res) => {
          console.log('res:::', res);
          if (res.data.status) {
           this.loadingService.hide(); 
           let navigationExtrars: NavigationExtras = {
            state: {
              code: this.codeEquipment
            }
          };
          this.router.navigateByUrl('/equipment/maintenance/add-maintenance-success', navigationExtrars);
          } else {
            this.loadingService.hide(); 
            this.toastService.presentToast(res.data.message);
          }
        }
      )
    }
  
    async openGallery() {
      //console.log(this.frmRendicion.value);
      const actionSheet = await this.actionSheetController.create({
        header: 'Seleccione imagen',
        buttons: [{
          text: 'Desde Galeria',
          handler: () => {
            this.pickImage('galeria');
          }
        }, {
          text: 'Use Camera',
          handler: () => {
            this.pickImage('camera');
          }
        }, {
          text: 'Cancelar',
          role: 'cancel'
        }]
      });
      await actionSheet.present();
    }
  
    async pickImage(sourceType: any) {
      let image = null;
      if (sourceType == 'galeria') {
        image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Photos
        });
      } else {
        image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera
        });
      }
      
      console.log('image:::', image);
  
      if (image) {
        this.hasImage = false;
        this.saveImage(image);
      }
    }
  
    async saveImage(photo: Photo) {
      const base64Data = await this.readAsBase64(photo);
      this.serverBase64Data = base64Data;
      console.log('Imagen en Base64:', base64Data);
    
      // Borra imágenes anteriores antes de guardar la nueva
      try {
        const files = await Filesystem.readdir({ directory: Directory.Data, path: IMAGE_DIR });
        for (const file of files.files) {
          await Filesystem.deleteFile({
            directory: Directory.Data,
            path: `${IMAGE_DIR}/${file.name}`
          });
        }
      } catch (err) {
        console.error('No se encontraron imágenes previas para borrar.');
      }
    
      // Guarda la nueva imagen
      const fileName = new Date().getTime() + '.jpeg';
      const savedFile = await Filesystem.writeFile({
        directory: Directory.Data,
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Data,
        recursive: true
      });
    
      console.log('Imagen guardada:', savedFile);
    
      // Cargar la imagen guardada
      await this.LoadFile();
    }
  
    async readAsBase64(photo: Photo) {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
    
      return await this.convertBlobToBase64(blob) as string;
    }
  
    convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  
    async LoadFile() {
      const loading = await this.loadingController.create({
        message: 'Cargando imagen...'
      });
      await loading.present();
    
      try {
        const result = await Filesystem.readdir({
          directory: Directory.Data,
          path: IMAGE_DIR
        });
    
        console.log('Archivos en el directorio: ', result);
    
        if (result.files.length > 0) {
          const f = result.files[result.files.length - 1]; // Toma la última imagen
          const filePath = `${IMAGE_DIR}/${f.name}`;
    
          const readFile = await Filesystem.readFile({
            directory: Directory.Data,
            path: filePath
          });
    
          this.image = {
            name: f.name,
            path: filePath,
            data: `data:image/jpeg;base64,${readFile.data}`
          };
    
          console.log('Imagen cargada:', this.image);
        } else {
          this.image = undefined; // Si no hay imágenes, se borra el valor
        }
      } catch (err) {
        console.error('Error al leer la imagen:', err);
        await Filesystem.mkdir({
          directory: Directory.Data,
          path: IMAGE_DIR
        });
      }
    
      await loading.dismiss();
    }

}
