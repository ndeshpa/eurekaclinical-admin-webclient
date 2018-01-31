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

    private adminUserMePath = '/proxy-resource/users/me';
    private adminRolesPath = '/proxy-resource/roles';
    private adminUserListPath = '/proxy-resource/users';
    private adminUserUpdatePath = '/proxy-resource/users/';
    private destroySessionPath = '/destroy-session';
    private logoutSessionPath = '/logout';
    private sessionPropertiesPath = '/get-session-properties';

    private casLoginPath = '/login';
    private webClientUrl: String;
    private contextPath: String;
    private adminWebappUrl: String;

    constructor( private http: HttpClient ) {
        this.webClientUrl = localStorage.getItem( 'webClientUrl' );
        this.contextPath = localStorage.getItem( 'adminWebappContextPath' );
        this.adminWebappUrl = localStorage.getItem( 'adminWebappUrl' );
        console.log( 'Admin Service: Got from config.json' );
        console.log( 'webClientUrl: ' + this.webClientUrl );
        console.log( 'contextPath: ' + this.contextPath );
        console.log( 'adminWebappUrl: ' + this.adminWebappUrl );
        this.loading = false;
        //if ( this.data === null )
        //this.data = this.getUser();
    }

    //returns an observable
    public getUser() {
        return this.http.get<AdminUser>( this.contextPath + this.adminUserMePath );
    }

    public getRoles() {
        return this.http.get<AdminUser>( this.contextPath + this.adminRolesPath );
    }

    public getUserById( id: string ) {
        return this.http.get<AdminUser>( this.contextPath + this.adminUserListPath + '/' + id );
    }

    public getAllUsers() {
        return this.http.get( this.contextPath + this.adminUserListPath );
    }

    public putUserUpdates( id: number, body: string ) {
        var url = this.contextPath + this.adminUserUpdatePath + id;
        //set headers
        let headers = new HttpHeaders().set( 'Content-Type', 'application/json; charset=utf-8' );
        headers.append( 'Accept', 'application/json' );

        return this.http.put( url, body, { headers } );
    }



    public getSessionProperties() {
        return this.http.get( this.contextPath + this.sessionPropertiesPath );
    }

    public doLogout() {
        //return this.http.get( this.contextPath + this.logoutSessionPath, {responseType: 'text'});
        return this.http.get( localStorage.getItem( 'casLogoutUrl' ), { responseType: 'text' } );
    }

    public doLogin() {
        console.log( 'LOGGING IN from AdminServie: ' + this.getCasLoginUrl()
            + '?webclient=' + localStorage.getItem( 'webClientUrl' )
            + '/adminview' );
        //        return this.http.get( this.getCasLoginUrl()
        //                            + '?webclient=' + localStorage.getItem('webClientUrl') 
        //                            + '/welcome', 
        //                            {responseType: 'text'});
        return this.http.get( this.getCasLoginUrl()
            + '?webclient=' + localStorage.getItem( 'webClientUrl' )
            + '/adminview',
            { responseType: 'text' } )
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

    public getAdminWebappUrl() {
        return this.adminWebappUrl;
    }

    public getWebClientUrl() {
        return this.webClientUrl;
    }

    public getCasLoginUrl() {
        return ( this.contextPath + this.casLoginPath );
    }

}