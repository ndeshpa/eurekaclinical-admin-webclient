import { Inject, Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, Response, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { AdminUser } from '../models/admin-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class AdminService {
    private data: Observable<any> = null;
    private currUser: AdminUser;
    private userArray: Observable<any>;
    private usersAsJson: string;
    private loading: boolean;

    private adminUserMeUrl = '/eurekaclinical-user-webapp/proxy-resource/users/me';
    private adminUserListUrl = '/eurekaclinical-user-webapp/proxy-resource/users';
    private adminUserUpdateUrl = '/eurekaclinical-user-webapp/proxy-resource/users/';
    private adminUserCreateUrl = '/eurekaclinical-user-webapp/proxy-resource/users';
    private adminUserDeleteUrl = '/eurekaclinical-user-webapp/proxy-resource/users';

    constructor( private jsonp: Jsonp, private http: Http ) {
        this.loading = false;
        if ( this.data === null )
            this.data = this.getUser();
    }

    //returns an observable
    public getUser() {
        return this.http.get( this.adminUserMeUrl ).map( response => response.json() );
    }
    
    public getAllUsers() {
        return this.http.get( this.adminUserListUrl ).map( response => response.json() );
    }
    
    public putUserUpdates(id:number, body: string) {
        var url = this.adminUserUpdateUrl + id;
        //set headers
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        
        this.http.put(url, body, {headers}).subscribe(response => 
                            console.log(response.json()));
    }
    
    public postUser(body:string){
        var url = this.adminUserCreateUrl;
        //set headers
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        
        this.http.post(url, body, {headers}).subscribe(response => 
                            console.log(response.json()));
    }

    public getCurrUser() {
        return this.data;
    }

    public getUserArray() {
        return this.userArray;
    }

    public getUsersAsJson() {
        return this.usersAsJson;
    }
}
