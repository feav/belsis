import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

import { Platform } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import * as HighCharts from 'highcharts';
import {ChoiceProduitPage} from "./commandes/choice-produit/choice-produit.page" ;
import {EditCategorieComponent} from "./categorie/edit-categorie/edit-categorie.component" ;
import {MenuPage} from "./menu/menu.page" ;
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { Base64 } from '@ionic-native/base64/ngx';


@NgModule({
  declarations: [AppComponent,ChoiceProduitPage,MenuPage,EditCategorieComponent],
  entryComponents: [ChoiceProduitPage,MenuPage,EditCategorieComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
      ChartsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      FormsModule,
      AngularFireDatabaseModule,
      HttpClientModule,
      IonicStorageModule.forRoot()

  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    Camera,
    Base64,
    File,
    FilePath,
    Platform,
    WebView,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}