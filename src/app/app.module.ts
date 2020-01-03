import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import * as HighCharts from 'highcharts';
import {ChoiceProduitPage} from "./commandes/choice-produit/choice-produit.page" ;
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,ChoiceProduitPage],
  entryComponents: [ChoiceProduitPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
      ChartsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      FormsModule,
      AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}