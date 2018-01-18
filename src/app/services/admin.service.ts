import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, HttpModule, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { AdminUser } from '../models/admin-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class AdminService {
    private data: Observable<any> = null;
    private currUser: AdminUser = new AdminUser();
    private userArray: Observable<any>;
    private usersAsJson: string;
    private loading: boolean;

    private adminUserMeUrl = '/eurekaclinical-admin-webapp/proxy-resource/users/me';
    private adminRolesUrl = '/eurekaclinical-admin-webapp/proxy-resource/roles';
    private adminUserListUrl = '/eurekaclinical-admin-webapp/proxy-resource/users';
    private adminUserUpdateUrl = '/eurekaclinical-admin-webapp/proxy-resource/users/';
    private adminUserCreateUrl = '/eurekaclinical-admin-webapp/proxy-resource/users';
    private adminUserDeleteUrl = '/eurekaclinical-admin-webapp/proxy-resource/users';
    private destroySessionUrl = '/eurekaclinical-admin-webapp/destroy-session';
    private logoutSessionUrl = '/eurekaclinical-admin-webapp/logout';
    private sessionPropertiesUrl = '/eurekaclinical-admin-webapp/get-session-properties';
    
    private casLoginUrl  = '/eurekaclinical-admin-webapp/login';
    private webClientUrl = 'https://localhost:8000';
    private adminWebappUrl = 'https://localhost:8000/eurekaclinical-admin-webapp';

    constructor(private http: HttpClient) {
        this.loading = false;
        if ( this.data === null )
            this.data = this.getUser();
    }

    //returns an observable
    public getUser() { 
        return this.http.get<AdminUser>( this.adminUserMeUrl );
    }
    
    public getRoles() {
        return this.http.get<AdminUser>( this.adminRolesUrl );
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
    
    
    public getSessionProperties() {
        return this.http.get(this.sessionPropertiesUrl);
    }
    
    public doLogout() {
        return this.http.get( this.logoutSessionUrl, {responseType: 'text'});
    }
    
    public doLogin() {
        return this.http.get( this.casLoginUrl + '?webclient=' + this.webClientUrl + '/adminview', 
                {responseType: 'text'});
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
     
    public getAdminWebappUrl(){
        return this.adminWebappUrl;
    }
    
    public getWebClientUrl(){
        return this.webClientUrl;
    }
    
    public getCasLoginUrl(){
        return this.casLoginUrl;
    }
    
}

export interface MyUser {
    action: string;
    id: number;
    username: string;
    fullName: string;
    lastLogin: Date;
    roles: any;
    email: string;
    organization: string;
    status: string;
    title: string;
    department: string;
}

export interface Role {
    id: number;
    name: string;
    isChecked: boolean;
}
