import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, HttpModule, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { AdminUser } from '../models/admin-user';
import { UserAgreement } from '../models/user-agreement';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ConfigFileService } from "./config-file.service";
import { RegistryEntry } from "../models/registry-entry";



@Injectable()
export class AdminService {
    private data: Observable<any> = null;
    private currUser: AdminUser = new AdminUser();
    private currUserId: number;
    private userArray: Observable<any>;
    private usersAsJson: string;
    private loading: boolean;
    //variables to track timeout
    private sessTimeoutInterval: number = 0; //stores the session idle timeout interval

    constructor( private http: HttpClient, private configService: ConfigFileService ) {
        this.loading = false;
    }

    //returns an observable
    public getUser(): Observable<AdminUser> {
        return this.http.get<AdminUser>( this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + this.configService.getCurrentAdminEndPoint() );
    }

    public getRoles() {
        return this.http.get<AdminUser>( this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + this.configService.getAdminRolesEndPoint() );
    }

    public getUserById( id: string ) {
        return this.http.get<AdminUser>( this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + this.configService.getAdminUsersEndPoint() + '/' + id );
    }

    public getAllUsers() {
        return this.http.get( this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + this.configService.getAdminUsersEndPoint() );
    }
    
    public getAllJobs() {
        return this.http.get( this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + this.configService.getAdminAllJobsEndPoint() );
    }
    
    public putUserUpdates( id: number, body: string ) {
        var url = this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + this.configService.getAdminUsersUpdateEndPoint() + id;
        //set headers
        let headers = new HttpHeaders().set( 'Content-Type', 'application/json; charset=utf-8' );
        headers.append( 'Accept', 'application/json' );

        return this.http.put( url, body, { headers } );
    }

    public getUserAgreementCurrent() {
        return this.http.get<UserAgreement>( this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + this.configService.getAdminUserAgreementEndPoint() + '/current' );
    }

    public getRegistryEntries() {
        return this.http.get( this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + this.configService.getAdminRegistryEndPointFiltered() );
    }

    public getRegistryAllEntries() {
        return this.http.get( this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + this.configService.getAdminRegistryComponentsEndPoint() );
    }
    
    public postUserAgreement( id: number, body: string ) {
        var url = this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + this.configService.getAdminUserAgreementEndPoint();
        //set headers
        let headers = new HttpHeaders().set( 'Content-Type', 'application/json; charset=utf-8' );
        headers.append( 'Accept', 'application/json' );
        return this.http.post( url, body, { headers, responseType: 'text' } );
    }

    public postNewUser( body: string ) {
        var url = this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + this.configService.getAdminCreateUserEndPoint();
        //set headers
        let headers = new HttpHeaders().set( 'Content-Type', 'application/json; charset=utf-8' );
        headers.append( 'Accept', 'application/json' );
        return this.http.post( url, body, { headers, responseType: 'text' } );
    }
    
    public postUserList( body: string ) {
        var url = this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + this.configService.getAdminRetrieveUsersEndPoint();
        //set headers
        let headers = new HttpHeaders().set( 'Content-Type', 'application/json; charset=utf-8' );
        headers.append( 'Accept', 'application/json' );
        return this.http.post( url, body, { headers, responseType: 'text' } );
    }
    
    public getSessionProperties() {
        return this.http.get( this.configService.getAdminWebappContextPath()
            + this.configService.getAdminSessionPropertiesEndPoint() );
    }  
    
    public getSession(){
        return this.http.get( this.configService.getAdminWebappContextPath()
                + this.configService.getAdminSessionEndPoint(), {responseType: 'text'});
    }

    public doLogout() {
        return this.http.get( this.getCasLogoutUrl(), { responseType: 'text' } );
    }

    public isProduction() {
        return this.configService.isProduction();
    }

    public getLoginUrl() {
        return this.configService.getAdminWebappContextPath()
            + this.configService.getCasLoginUrl()
            + '?webclient=' + this.configService.getWebClientUrl();
    }

    public getWebappContextPath() {
        return this.configService.getAdminWebappContextPath();
    }

    public getCurrUserId() {
        this.getUser().subscribe( data => {
            this.currUserId = data.id;
        } );
        return this.currUserId;
    }

    public getUserArray() {
        return this.userArray;
    }

    public getUsersAsJson() {
        return this.usersAsJson;
    }

    public getAdminWebappUrl() {
        return this.configService.getAdminWebappContextRoot();
    }

    public getWebClientUrl() {
        return this.configService.getWebClientUrl();
    }

    public getCasLoginUrl() {
        return this.configService.getCasLoginUrl();
    }

    public getCasLogoutUrl() {
        return this.configService.getCasLogoutUrl();
    }

    public isLoggedIn() {
        return this.configService.getLoggedIn();
    }

    public setLoggedIn( loggedIn: boolean ) {
        return this.configService.setLoggedIn( loggedIn );
    }

    public setSessTimeoutInterval() {
        this.getSessionProperties().subscribe( data => {
            JSON.parse( JSON.stringify( data ), ( key, value ) => {
                if ( key === 'maxInactiveInterval' ) {
                    var temp = +value;
                    this.sessTimeoutInterval = temp - 180;
                    localStorage.setItem( 'sessionTimeout', this.sessTimeoutInterval.toString() );
                }
            } );
        } );
    }

    public getSessTimeoutInterval() {
        return this.sessTimeoutInterval;
    }
    
    public createRandomPassword(length) {
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var pass = "";
        for (var x = 0; x < length; x++) {
            var i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    }

}
