import { Settings } from './../app/models/settings.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DOCUMENT } from '@angular/common';

let isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080'));
let settings: Settings = new Settings();
const hostItem = 'host';

if(isApp){

    const nativeStorage: NativeStorage = new NativeStorage();
    nativeStorage.getItem(hostItem)
    .then(
        data => {
            if(data){
                settings.setHostAddress(data['host_address']);   
            }
            // console.log(settings);
        },
        error => {
            console.log(error);
        }
    );    
}else{

    const host_settings = localStorage.getItem(hostItem);
    if(host_settings){
        settings.setHostAddress(JSON.parse(host_settings)['host_address']);
    }
    
}

export const environment = {
    production: true,
    host: settings.getHostAddress(),
    firebase: {
        apiKey: 'AIzaSyD2sjUZjC3K1EVkmxmMO2b3rx8TjaQKHl4',
        authDomain: 'belsis-da714.firebaseapp.com',
        databaseURL: 'https://belsis-da714.firebaseio.com',
        projectId: 'belsis-da714',
        storageBucket: 'belsis-da714.appspot.com',
        messagingSenderId: '920178724362',
        appId: '1:920178724362:web:46b35fcab1ff38c5e459f3',
        measurementId: 'G-1LLH9JRX3Q'
    }
};
