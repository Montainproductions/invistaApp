import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, IonDatetime, LoadingController, NavController } from '@ionic/angular';
import { format, parse, parseISO } from 'date-fns';
import { InvistaService } from 'src/app/services/invista.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
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
  selector: 'app-add-km',
  templateUrl: './add-km.page.html',
  styleUrls: ['./add-km.page.scss'],
  standalone: false
})
export class AddKmPage implements OnInit {

  public kmForm: FormGroup | any;
  errorMsg: string[] = [];
  isSubmitted = false;
  image: LocalFile | undefined;

  showPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'
  formattedString = '';
  @ViewChild(IonDatetime) datetime: IonDatetime | undefined;

  codeEquipment: any | undefined;
  equipment: any;
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
        this.codeEquipment = navigation.extras.state['code'] ?? '';
        this.plate = navigation.extras.state['plate'] ?? '';
      } 
      console.log(this.codeEquipment, this.plate);
      this.getEquipment();
    });
    
  }

  ngOnInit() {
    this.kmForm = this.formBuilder.group({
      code: new FormControl(this.codeEquipment, Validators.compose([
        Validators.required,
      ])),
      date: new FormControl(this.formattedString, Validators.compose([
        Validators.required,
      ])),
      km: new FormControl('', Validators.compose([
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
  }

  getEquipment() {
    this.invistaService.findEquipment(this.codeEquipment).then(
      (res) => {
        console.log('res:::', res.data.data)
        this.equipment = res.data.data.equipment;
        this.kmForm.patchValue({
          km: this.equipment.Km,
        });
      }
    )
  }

  setToday() {
    this.formattedString = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'), 'dd/MM/yyyy');
  }

  dateChanged(value: any) {
    console.log(value);
    this.dateValue = value;
    this.formattedString = format(parseISO(value), 'dd/MM/yyyy');
    this.kmForm.patchValue({ date: this.formattedString });
    this.showPicker = false;
  }

  close() {
    this.datetime?.cancel(true);
  }

  select() {
    this.datetime?.confirm(true);
  }

  goBack() {
    console.log('back')
    this.navController.back()
  }

  async registerKmEquipment() {
    console.log(this.kmForm.value);
    this.isSubmitted = true;
    if (!this.kmForm?.valid) return;
    console.log(this.kmForm.value);
    this.loadingService.show('Guardando...');

    let pathImage = this.serverBase64Data;
    this.kmForm.value.image = pathImage;

    console.log('this.kmForm.value:::', this.kmForm.value);

    await this.invistaService.storeKmEquipment(this.kmForm.value).then(
      (res) => {
        console.log('res:::', res);
        if (res.data.status) {
         this.loadingService.hide(); 
         let navigationExtrars: NavigationExtras = {
          state: {
            code: this.codeEquipment
          }
        };
        this.router.navigateByUrl('/equipment/km/add-km-success', navigationExtrars);
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
