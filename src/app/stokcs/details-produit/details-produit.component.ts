import { Component, OnInit,Input, ChangeDetectorRef  } from '@angular/core';
import { MenuController , ToastController, ActionSheetController, Platform ,ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

import { Base64 } from '@ionic-native/base64/ngx';

import { ProduitService } from '../../services/produit.service';
import { UsersService } from '../../services/users.service';

import { Product } from '../../models/product.model';
import { Restaurant } from '../../models/restaurant.model';

import * as $ from 'jquery';
import { UtilsService } from "../../services/utils.service";

declare var fileTrigger:any;


@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss'],
})
export class DetailsProduitComponent implements OnInit {


    public product: Product = new Product();

    @Input() cat_name  : string;
    @Input() cat_id : number;
    @Input() produits:{
        id:0,
        url: any,
        name:any,
        prix:any,
        quantite:any,
        description:any,
        categories: any,
        logo:any,
        restoID:any,
    };
	public cat;
    public restoId:number;
	public categories:any=["Fruit","Glace","Boissons","légumes"]
	

	public categorie:string = "";

    public images = [];
    public restaurant: Restaurant = new Restaurant();

    constructor(
        private base64: Base64,
        private platform: Platform,
        private camera: Camera,
        private file: File,
        private webView: WebView,
        private storage: Storage,
        private filePath: FilePath,
        private actionSheetController: ActionSheetController,
        private ref: ChangeDetectorRef,
        private produitService: ProduitService,
        private toast: ToastController,
        private user: UsersService,
        private utilService:UtilsService,
        private modalCtrl:ModalController,
        private alertController: AlertController
    ) { }
    closeModal(){
        this.modalCtrl.dismiss(0);
    }

	ngOnInit() {

        this.platform.ready().then(() => {
            this.loadStoredImages();
        });

        // Getting Restaurant of the Current User
        this.user.getRestaurantOfUser().subscribe( data => {
            console.log(data);
            this.restaurant = data;
        }, error => {
            console.log(error);
        });
    }

    loadStoredImages() {

        this.storage.get('test').then(images => {
            if(images){
                let arr = JSON.parse(images);
                this.images = [];
                for(let img of arr){
                    let filePath = this.file.dataDirectory + img;
                    let resPath = this.pathForImage(filePath);
                    this.images.push({name: img, path: resPath, filePath: filePath});
                }
            }
        });

    }

    pathForImage(img) {

        if(img === null){
            return '';
        } else {
            let converted = this.webView.convertFileSrc(img);
            return converted;
        }
    }
    /* FONCTION UTILISEE */
    async selectImage(){
        
        const actionSheet = await this.actionSheetController.create({
            header: "Select Image Source",
            buttons: [
                {
                    text: 'Load From Library',
                    handler: ()=>{
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: ()=>{
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });

        await actionSheet.present();
    }
    /* fonction utilisee */
    takePicture(sourceType: PictureSourceType) {

        const options : CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
              destinationType: this.camera.DestinationType.DATA_URL
        };

        this.camera.getPicture(options).then(imagePath =>{
            this.produits.logo = 'data:image/jpeg;base64,' + imagePath;
            // this.base64.encodeFile(imagePath).then((base64File: string) => {
            //   alert(base64File);
            //     this.produits.logo = base64File;
            // }, (err) => {
            //   console.log(err);
            // });
        });
    }


    /* Fontion is use */
    createFileName() {
        const date = new Date();
        const time = date.getTime();
        const newFileName = time +  '.jpg';
        console.log(newFileName);
        return newFileName;
    }

    /* Fontion is use */
    copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(()=>{
            this.updateStoredImages(newFileName);
        }, error => {
            console.log(error);
        });
    }

    /* Fontion is use */
    updateStoredImages(name) {
        
        this.storage.get('test').then(images => {
            
            let arr = JSON.parse(images);

            if (!arr) {
                let newImages = [name];
                this.storage.set('test', JSON.stringify(newImages));
            } else {
                arr.push(name);
                this.storage.set('test', JSON.stringify(arr));
            }
     
            let filePath = this.file.dataDirectory + name;
            let resPath = this.pathForImage(filePath);
     
            let newEntry = {
                name: name,
                path: resPath,
                filePath: filePath
            };
     
            //this.images = [newEntry, ...this.images];
            this.images = [newEntry];
            this.ref.detectChanges(); // trigger change detection cycle
        });
    }

    deleteImage(imgEntry, position) {

        this.images.splice(position, 1);
     
        this.storage.get('test').then(images => {
            let arr = JSON.parse(images);
            let filtered = arr.filter(name => name != imgEntry.name);
            this.storage.set('test', JSON.stringify(filtered));
     
            var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
     
            this.file.removeFile(correctPath, imgEntry.name).then(res => {
                // this.presentToast('File removed.');
            });
        });
    }

	startUpload(imgEntry) {
        this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
            .then(entry => {
                ( < FileEntry > entry).file(file => this.readFile(file))
            })
            .catch(err => {
                this.presentToast('Error while reading file.', 'danger');
            });
    }
     
    readFile(file: any) {
        const reader = new FileReader();
        reader.onload = () => {
            const formData = new FormData();
            const imgBlob = new Blob([reader.result], {
                type: file.type
            });
            formData.append('file', imgBlob, file.name);
            this.uploadImageData(formData);
        };
        reader.readAsArrayBuffer(file);
    }
     
    async uploadImageData(formData: FormData) {
        /*
        const loading = await this.loadingController.create({
            message: 'Uploading image...',
        });
        await loading.present();
     
        */
    }



    async presentToast(message,color) {
        const toast = await this.toast.create({
            position:'top',
            message:message,
            duration: 5000,
            color:color
        });
        toast.present();
    }
    /**
    ** @TODO implementons ceci
    **/
    formIsClean(){
        let bad = true;
        if(this.produits.name==''){
            this.presentToast("Nom non defini","warning");
            bad = false;
        }
        if(this.produits.logo==''){
            this.presentToast("Image non definie","warning");
            // bad = false;
        }
        if(this.produits.prix==''){
            this.presentToast("Prix non definie","warning");
            bad = false;
        }
        if(this.produits.quantite==''){
            this.presentToast("Quantite non definie","warning");
            bad = false;
        }
        if(this.produits.description==''){
            this.presentToast("Description non definie","warning");
            // bad = false;
        }
        return true;
    }
    removeProduct(){
        this.utilService.presentLoading("Suppression du produit dans le stock");
        this.produitService.deleteProduct(this.produits.id).then(
                datas =>{
                    this.utilService.dismissLoading();
                    this.modalCtrl.dismiss(1);
                },error=>{
                  console.log(error);
                }
              );
    }
    addProduct() {
        if(!this.formIsClean())return;        
        //addProduct(prix, quantite,restaurant,categorie,nom,description,image){
        this.utilService.presentLoading("Ajout du produit dans le stock");

        this.produitService.addProduct(
            this.produits.id,
            this.produits.prix,
            this.produits.quantite,
            this.restaurant.id,
            this.cat_id,
            this.produits.name,
            this.produits.description,
            this.produits.logo
            ).then(
                datas =>{
                    this.utilService.dismissLoading();
                    this.modalCtrl.dismiss(1);
                },error=>{
                  console.log(error);
                }
              );
    }

    async confirmDelete() {
	    const alert = await this.alertController.create({
	      header: 'Confirmation',
	      message: `Voulez vous supprimer : <strong> ${this.produits.name} </strong> ?`,
	      buttons: [
	        {
	          text: 'Annuler',
	          role: 'cancel',
	          cssClass: 'secondary',
	          handler: () => {
	            console.log('Confirmation annulée');
	          }
	        }, {
	          text: 'Okay',
	          handler: () => {
	            this.removeProduct();
	          }
	        }
	      ]
	    });

	    await alert.present();
	  }

}
