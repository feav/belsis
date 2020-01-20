import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { MenuController , ToastController, ActionSheetController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';


import { ProduitService } from '../../services/produit.service';
import { UsersService } from '../../services/users.service';

import { Product } from '../../models/product.model';

import * as $ from 'jquery';

declare var fileTrigger:any;

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss'],
})
export class AddProduitComponent implements OnInit {


    public product: Product = new Product();

	public produits:any = {
	    id:0,
		url: "",
		name:"",
		prix:"",
		quantite:"",
		categories: 0,
		logo:"../../assets/prod_1.png",
        restoID:0,
	};
	public cat;
    public produitCategoris: any[] = [
        {
            id: 1,
            name: 'Fruit',
            description: 'lorem isum 237 product',
        },
        {
            id: 2,
            name: 'Glace',
            description: 'lorem isum 237 product',
        },
        {
            id: 3,
            name: 'Boissons',
            description: 'lorem isum 237 product',
        },
        {
            id: 4,
            name: 'légumes',
            description: 'lorem isum 237 product',
        },
        {
            id: 5,
            name: 'Viande',
            description: 'lorem isum 237 product',
        },
        {
            id: 6,
            name: 'Corps gras',
            description: 'lorem isum 237 product',
        }
    ];
    public restoId:number;
	public categories:any=["Fruit","Glace","Boissons","légumes"]
	

	public categorie:string = "";

    public images = [];

    constructor(
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
        private user: UsersService
    ) { }


	ngOnInit() {

        this.platform.ready().then(() => {
            this.loadStoredImages();
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

    takePicture(sourceType: PictureSourceType) {

        const options : CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        this.camera.getPicture(options).then(imagePath =>{

            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
                .then(filePath => {
                    let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
            } else {
                let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }

        });
    }

    createFileName() {
        const date = new Date();
        const time = date.getTime();
        const newFileName = time +  '.jpg';
        console.log(newFileName);
        return newFileName;
    }

    copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(()=>{
            this.updateStoredImages(newFileName);
        }, error => {
            console.log(error);
        });
    }
        
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

    /*

	public valider(){

        localStorage.setItem("categories",JSON.stringify(this.produitCategoris));
        let testObject = localStorage.getItem('products');
        let oldProduct = new Array();
        if ( testObject != null ){
            this.produits.url = "../../../assets/prod_2.jpg";
        	this.produits.id = 0;
        	this.produits.id = parseInt(this.lastId()) + 1;
        	this.produits.categories = parseInt(this.cat);
        	this.produits.restoID = this.user.curentUserInfo()[0].restoId;
        	// let newProduct = this.produit.pushProduct(this.produits.id,this.produits.name,this.produits.prix,this.produits.quantite,this.user.curentUserInfo()[0].restoId,this.produits.categories,this.produits.url);
        	let rec = JSON.parse(testObject);
            // rec.push(newProduct);
            console.log(rec);
            localStorage.setItem("products",JSON.stringify(rec));
            this.presentToast(" produit "+this.produits.name+" enregistré ","success");
		}else {
        	this.produits.url = "../../../assets/prod_2.jpg";
        	this.produits.id = 1;
            this.produits.categories = parseInt(this.cat);
            this.produits.restoID = this.user.curentUserInfo()[0].restoId;
            // let newProduct = this.produit.pushProduct(this.produits.id,this.produits.name,this.produits.prix,this.produits.quantite,this.user.curentUserInfo()[0].restoId,this.produits.categories,this.produits.url);
            // oldProduct.push(newProduct);
            console.log(oldProduct);
            localStorage.setItem("products", JSON.stringify(oldProduct));
            this.presentToast("produit "+this.produits.name+" enregistré ","success");
		}
	}

    */

	public lastId():any{
        let storage = localStorage.getItem('products');
        let  storages = JSON.parse(storage);
        return storages.length;
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
     
        this.http.post("http://localhost:8888/upload.php", formData)
            .pipe(
                finalize(() => {
                    loading.dismiss();
                })
            )
            .subscribe(res => {
                if (res['success']) {
                    this.presentToast('File upload complete.', "success")
                } else {
                    this.presentToast('File upload failed.', "danger")
                }
            });
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

    addProduct() {

        let formData = new FormData();
        formData.append('test', 'test');
        for(let key in this.product){
            console.log({key: key, value: this.product[key]});
            formData.append(key, this.product[key]);
        }

        this.produitService.saveProduct(formData).subscribe(data => {
            console.log(data);
        }, error => {
            console.log(error);
        });
    }


}


/*
class Product{
    url: "";
    id: 0;
    name:"";
    prix:"";
    quantite:"";
    categories: '';
    logo:"../../assets/prod_1.png"

	private openChooser(){
		fileTrigger();
	}

	private onFileSelected(event): void {
    	if (event.target.files && event.target.files[0]) {
        	const file = event.target.files[0];

        	const reader = new FileReader();
        	// reader.onload = (e) => {this.produits.url = reader.result};

        	reader.readAsDataURL(file);
    	}
	}


}
*/