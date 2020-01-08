import { Injectable } from '@angular/core';

// Native Components
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { Settings } from './../models/settings.model';
import { environment } from './../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class SettingsService {

	private host_item: string = 'host';

	constructor() { }

	// Save settings
    savSettings(nativeStorage: NativeStorage, settings: Settings): void {

    	if(environment.production){ // for production

    		nativeStorage.setItem(this.host_item, settings)
		    	.then(
		    		() => console.log('Stored item!'),
		    		error => console.error('Error storing item', error)
		  		);

    	}else{ // for development

    		localStorage.setItem(this.host_item, JSON.stringify(settings));
    	}
    	
    }

    // Load defaults settings
    loadSettings(nativeStorage: NativeStorage): Settings {

    	let settings: Settings = null;

    	if(environment.production){ // for production

	    	nativeStorage.getItem(this.host_item)
	    		.then(
	    			data => { 
	    				settings = data;
	    				console.log(settings);
	    			},
	    			error => { 
	    				console.log(error);
	    			}
	    		);

    	}else { // for development

    		settings = JSON.parse(localStorage.getItem(this.host_item));

    	}

    	return settings;
    }
}
