import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';

// Native Components
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { Settings } from './../../../models/settings.model';

import { environment } from './../../../../environments/environment';


@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.page.html',
  styleUrls: ['./general-settings.page.scss'],
})
export class GeneralSettingsPage implements OnInit {

	host_item: string = 'host';
	host_address: string = '';
	settings: Settings = new Settings();

    constructor(private nativeStorage: NativeStorage, private platform: Platform) { }

    ngOnInit() {
    }

    ionViewDidEnter() {
    	this.loadSettings();
    }

    // Save settings
    save(): Settings {

    	this.settings.setHostAddress(this.settings.getHostAddress());

		const isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080'));
		
		if(isApp) { // for devices

			this.nativeStorage.setItem(this.host_item, this.settings)
	    	.then(
	    		() => console.log('Stored item!'),
	    		error => console.error('Error storing item', error)
	  		);

		}else { // for browsers
			localStorage.setItem(this.host_item, JSON.stringify(this.settings));
		}
		// console.log(this.settings);
    	return this.settings;
    	
    }

    // Load defaults settings
    loadSettings(): Settings {

    	let isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080'));
		

		if(isApp){

		    this.nativeStorage.getItem(this.host_item)
		    .then(
		        data => {
		            if(data){
		                this.settings.setHostAddress(data['host_address']);   
		            }else{
						this.settings.setHostAddress('http://belsis.cm/index.php');
					}
		            console.log(this.settings);
		        },
		        error => {
					this.settings.setHostAddress('http://belsis.cm/index.php');
		            console.log(error);
		        }
		    );    
		}else{

		    const host_settings = localStorage.getItem(this.host_item);

		    if(host_settings){
		        this.settings.setHostAddress(JSON.parse(host_settings)['host_address']);
		        // console.log(this.settings);
		    }else{
				this.settings.setHostAddress('http://belsis.cm/index.php');
			}

		    return this.settings;
		    
		}

    }

}
