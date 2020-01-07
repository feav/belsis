import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './../services/auth.service';

import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

	constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    	if(this.authService.getJwtToken()){
    		request = this.addToken(request, this.authService.getJwtToken());
    	}

    	return next.handle(request).pipe(catchError(error=>{

    		if(error instanceof HttpErrorResponse && error.status === 401){
    			return this.handle401Error(request, next);
    		}else{
    			return throwError(error);
    			
    		}
    	}));
    }

    private addToken(request: HttpRequest<any>, token: string){
    	return request.clone({
    		setHeaders: {
    			'Content-Type': 'application/json',
    			'Authorization': `Bearer ${token}`
    		}
    	});
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler){

    	if(!this.isRefreshing){
    		this.isRefreshing = true;
    		this.refreshTokenSubject.next(null);

    		return this.authService.refreshToken().pipe(
    			switchMap((token: {jwt: string, refreshToken: string})=>{
    				this.isRefreshing = false;
    				this.refreshTokenSubject.next(token.jwt);
    				return next.handle(this.addToken(request, token.jwt));
    			})
    		)
    	}else{
    		return this.refreshTokenSubject.pipe(
    			filter(token => token != null),
    			take(1),
    			switchMap(jwt => {
    				return next.handle(this.addToken(request, jwt));
    			})
    		)
    	}
    }

}
