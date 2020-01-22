import { Component, OnInit } from '@angular/core';
import  {ModalController,NavController} from '@ionic/angular';
import { UtilsService } from "../services/utils.service";
import { CategorieService } from "../services/categorie.service";
import { EditCategorieComponent } from './edit-categorie/edit-categorie.component';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {
  private categories:any;
  constructor(private modalController: ModalController,public navCtrl: NavController,private modalCtrl:ModalController,private utilService:UtilsService, private catService:CategorieService) { }
  selectPage(url){
    this.modalCtrl.dismiss(url);

  }

  goBack() {
    this.navCtrl.pop();
  }

  logOut(){
    this.modalCtrl.dismiss(-1);
  }
    openModalMenu(){
    this.utilService.openMenu();
  }
  closeMenu(){
    this.modalCtrl.dismiss(null);
  }
  ngOnInit() {
    this.initCategory();
  }

  initCategory(){

    let utilService = this.utilService;

    this.utilService.presentLoading("Chargement de Categories");
    this.catService.getAllByUser().then(datas=>{
      console.log(datas);
            this.categories = datas;
            utilService.dismissLoading();
        });
    
  }

    async openCategori(i) {
      var cat_id = 0, cat_name="",image="",description="";
      image = "data:image/png;base64,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";
      if(i>=0){
        cat_id = this.categories[i].id;
        cat_name = this.categories[i].nom;
        image = this.categories[i].image;
        description = this.categories[i].description;
      }
      const modal = await this.modalController.create({
        component: EditCategorieComponent,
            componentProps: { 
              cat_id: cat_id,
              cat_name : cat_name,
              image: image,
              description: description
            }
      });
        modal.onDidDismiss()
        /**
        ** @TODO faire en sorte de bien mettre a jour le panier genre
        **/
        .then((data) => {
            console.log(data.data);
            if(data.data ){
              this.initCategory();
            }else{

            }
            
            
            // this.cardTotal = somme;
        });
      return await modal.present();
    }
}

