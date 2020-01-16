import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { filter, tap, mapTo, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Settings } from './../models/settings.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DOCUMENT } from '@angular/common';

import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

	private readonly JWT_TOKEN = 'JWT_TOKEN';
	private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

	private readonly CLIENT_ID = 'CLIENT_ID';
	private readonly CLIENT_SECRET = 'CLIENT_SECRET';

	private loggedUser: string = null;

    private isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080'));
    private settings: Settings = new Settings();
    private hostItem = 'host';

    constructor(private http: HttpClient, private nativeStorage: NativeStorage) { }

    createClient(client: {"redirect-uri": "/home", "grant-type": "password" }): Observable<{client_id: string, client_secret: string}> {
        return this.http.post<any>(`${this.settings.getHostAddress()}/createClient`, client);
    }

    login(user: { client_id: string, client_secret: string, grant_type: string, username: string, password: string }): Observable<any> {

    	return this.http.post(`${this.settings.getHostAddress()}/oauth/v2/token`, user)
    		.pipe(
    			tap((tokens: {access_token: string, expires_in: string, token_type: string, scope: string, refresh_token: string}) => {console.log(tokens);this.doLoginUser(user.username, {jwt: tokens.access_token, refreshToken: tokens.refresh_token})}),
    			mapTo({status: true}),
    			catchError(error =>{
    				return of({status: false, error: error});
    			})
    		);
    }

    logout(): void {
        this.doLogoutUser();
    }

    isLoggedIn() {
    	return !!this.getRefreshToken();
    }

    refreshToken(){
    	return  this.http.post<any>(`${this.getHostAddress()}/refresh`, {
    		'refreshToken': this.getRefreshToken()
    	}).pipe(tap((tokens: {jwt: string, refreshToken: string})=>{
    		this.storeJwtToken(tokens.jwt);
    	}));
    }


    getRefreshToken(){
    	return localStorage.getItem(this.REFRESH_TOKEN)
    }

    getJwtToken(){
    	return localStorage.getItem(this.JWT_TOKEN)
    }

    getClientID(){
        return localStorage.getItem(this.CLIENT_ID);
    }

    getClientSecret(){
        return localStorage.getItem(this.CLIENT_SECRET);
    }

    private storeJwtToken(jwt: string){
    	localStorage.setItem(this.JWT_TOKEN, jwt);
    }

    private storeRefreshToken(refreshToken: string){
    	localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
    }

    private doLoginUser(username: string, tokens: {jwt: string, refreshToken: string}){
    	this.loggedUser = username;
    	this.storeTokens(tokens);
    }

    private doLogoutUser(){
    	this.loggedUser = null;
    	this.removeTokens();
    }

    private storeTokens(tokens: {jwt: string, refreshToken: string}){
    	localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    	localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    }

    private removeTokens(){
    	localStorage.removeItem(this.JWT_TOKEN);
    	localStorage.removeItem(this.REFRESH_TOKEN);
    }

    storeClient(client: { client_id: string, client_secret: string }){
    	localStorage.setItem(this.CLIENT_ID, client.client_id);
    	localStorage.setItem(this.CLIENT_SECRET, client.client_secret);
    }

    private removeClient(client: { client_id: string, client_secret: string }){
    	localStorage.removeItem(this.CLIENT_ID);
    	localStorage.removeItem(this.CLIENT_SECRET);
    }

    private getHostAddress(): string {

        if(this.isApp){
            this.nativeStorage.getItem(this.hostItem)
            .then(
                data => {
                    if(data){
                        this.settings.setHostAddress(data['host_address']);
                    }else{
                        this.settings.setHostAddress('')
                    }
                    // console.log(settings);
                },
                error => {
                    console.log(error);
                }
            );
        }else{

            const host_settings = localStorage.getItem(this.hostItem);
            if(host_settings){
                this.settings.setHostAddress(JSON.parse(host_settings)['host_address']);
            }
    
        }

        return this.settings.getHostAddress();
    }

}
