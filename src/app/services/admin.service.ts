import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, HttpModule, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { AdminUser } from '../models/admin-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';



@Injectable()
export class AdminService {
    private data: Observable<any> = null;
    private currUser: AdminUser = new AdminUser();
    private userArray: Observable<any>;
    private usersAsJson: string;
    private loading: boolean;

    private adminUserMeUrl = '/eurekaclinical-user-webapp/proxy-resource/users/me';
    private adminUserListUrl = '/eurekaclinical-user-webapp/proxy-resource/users';
    private adminUserUpdateUrl = '/eurekaclinical-user-webapp/proxy-resource/users/';
    private adminUserCreateUrl = '/eurekaclinical-user-webapp/proxy-resource/users';
    private adminUserDeleteUrl = '/eurekaclinical-user-webapp/proxy-resource/users';
    private casLogoutUrl = '/cas-server/logout';
    private casLoginUrl = '/cas-server/login';

    constructor(private http: HttpClient, private proxyService:ProxyService ) {
        this.loading = false;
        if ( this.data === null )
            this.data = this.getUser();
        
    }

    //returns an observable
    public getUser() {
        return this.http.get<AdminUser>( this.adminUserMeUrl );
    }
    
    public getUserById(id:string) {
        return this.http.get<AdminUser>( this.adminUserListUrl + '/' + id );
    }
    
    public getAllUsers() {
        return this.http.get( this.adminUserListUrl );
    }
    
    public putUserUpdates(id:number, body: string) {
        var url = this.adminUserUpdateUrl + id;
        //set headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/json');
        
        return this.http.put(url, body, {headers});
    }
    
    public postUser(body:string){
        var url = this.adminUserCreateUrl;
        //set headers
        let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/json');
        
        this.http.post(url, body, {headers});
    }
    
    public doLogout() {
        return this.http.get( this.casLogoutUrl );
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
