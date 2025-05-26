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
  selector: 'app-edit-fuel',
  templateUrl: './edit-fuel.page.html',
  styleUrls: ['./edit-fuel.page.scss'],
  standalone: false
})
export class EditFuelPage implements OnInit {

  public fuelForm: FormGroup | any;
    errorMsg: string[] = [];
    isSubmitted = false;
    image: LocalFile | undefined;
    imagenUrl : any;
    hasImage: boolean = false;

    showPicker = false;
    dateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'
    formattedString = '';
    @ViewChild(IonDatetime) datetime: IonDatetime | undefined;
  
    codeEquipment: any | undefined;
    idEquipment: any | undefined;
    plate: any | undefined;
    tipoCombustible: any = '';
    equipment: any;
    equipmentFuel: any;
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
        this.getEquipmentFuel();
      } 
      console.log(this.codeEquipment, this.plate);
    });
  }

  ngOnInit() {
    this.fuelForm = this.formBuilder.group({
      Nr: new FormControl(this.idEquipment, Validators.compose([
        Validators.required,
      ])),
      code: new FormControl(this.codeEquipment, Validators.compose([
        Validators.required,
      ])),
      date: new FormControl(this.formattedString, Validators.compose([
        Validators.required,
      ])),
      km: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      provider: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      gallon: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      amount: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      image: new FormControl('', [])
    })
  }

  validation_messages = {
      'code': [
        { type: 'required', message: 'Ingresa el código de equipo'},
      ],
      'date': [
        { type: 'required', message: 'Ingrese la fecha'},
      ],
      'km': [
        { type: 'required', message: 'Ingrese el km'},
      ],
      'provider': [
        { type: 'required', message: 'Ingrese el proveedor'},
      ],
      'gallon': [
        { type: 'required', message: 'Ingrese los galones'},
      ],
      'amount': [
        { type: 'required', message: 'Ingrese el precio total'},
      ],
    }
  
    getEquipmentFuel()
    {
      this.invistaService.findEquipmentFuel(this.idEquipment).then(
        (res) => {
          this.equipmentFuel = res.data.data.equipmentfuel;
          //this.tipoCombustible = this.equipment.TipoDeCombustible;
          console.log('res:::', this.equipmentFuel);
          this.codeEquipment = this.equipmentFuel.EquipmentCode;

          if (typeof this.equipmentFuel.Fecha === 'string') {
            this.equipmentFuel.Fecha = new Date(this.equipmentFuel.Fecha + 'T00:00:00');
          }

          if (this.equipmentFuel.Fecha instanceof Date && !isNaN(this.equipmentFuel.Fecha.getTime())) {
            this.formattedString = format(this.equipmentFuel.Fecha, 'dd/MM/yyyy');
          } 

          if (this.equipmentFuel.image) {
            this.hasImage = true;
            this.imagenUrl = `https://app.invista.pe/public/assets/uploads/${this.equipmentFuel.image}`  
          }
          
          this.fuelForm.patchValue({
            code: this.equipmentFuel.EquipmentCode,
            date: this.formattedString,
            km: this.equipmentFuel.Km,
            provider: this.equipmentFuel.Provider,
            gallon: this.equipmentFuel.Galones,
            amount: this.equipmentFuel.Monto,
          });

          this.getEquipment();

        }
      )
    }

    getEquipment()
  {
    this.invistaService.findEquipment(this.codeEquipment).then(
      (res) => {
        this.equipment = res.data.data.equipment;
        this.tipoCombustible = this.equipment.TipoDeCombustible;
        console.log('res:::', this.equipment);

        

      }
    )
  }
  
    setToday() {
        this.formattedString = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'), 'dd/MM/yyyy');
        console.log(this.formattedString);
    }
    
    dateChanged(value: any) {
        console.log(value);
        this.dateValue = value;
        this.formattedString = format(parseISO(value), 'dd/MM/yyyy');
        this.fuelForm.patchValue({ date: this.formattedString });
        this.showPicker = false;
    }
    
    close() {
      this.datetime?.cancel(true);
    }
    
    select() {
        this.datetime?.confirm(true);
    }
    
    goBack() {
        this.navController.back()
    }
  
    async registerFuelEquipment() {
        console.log(this.fuelForm.value);
        this.isSubmitted = true;
        if (!this.fuelForm?.valid) return;
  
        this.loadingService.show('Guardando...')
  
        let pathImage = this.serverBase64Data;
        this.fuelForm.value.image = pathImage;
        
        await this.invistaService.updateFuelEquipment(this.fuelForm.value).then(
          (res) => {
            console.log('res:::', res);
            if (res.data.status) {
              this.loadingService.hide(); 
              let navigationExtrars: NavigationExtras = {
                state: {
                  code: this.codeEquipment
                }
              };
              this.router.navigateByUrl('/equipment/fuel/add-fuel-success', navigationExtrars);
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
