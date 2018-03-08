import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, HttpModule, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { AdminUser } from '../models/admin-user';
import { UserAgreement } from '../models/user-agreement';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ConfigFileService } from "./config-file.service";



@Injectable()
export class AdminService {
    private data: Observable<any> = null;
    private currUser: AdminUser = new AdminUser();
    private currUserId: number;
    private userArray: Observable<any>;
    private usersAsJson: string;
    private loading: boolean;

//    private adminUserMePath = '/proxy-resource/users/me';
//    private adminRolesPath = '/proxy-resource/roles';
//    private adminUserListPath = '/proxy-resource/users';
//    private adminUserUpdatePath = '/proxy-resource/users/';
//    private destroySessionPath = '/destroy-session';
//    private logoutSessionPath = '/logout';
//    private sessionPropertiesPath = '/get-session-properties';
//
//    private casLoginUrl: String;
//    private casLogoutUrl: String;
//    private webClientUrl: String;
//    private contextPath: String;
//    private adminWebappUrl: String;
//    private adminWebappContextPath: String;

    constructor( private http: HttpClient, private configService:  ConfigFileService) {
//        this.webClientUrl = localStorage.getItem( 'webClientUrl' );
//        this.contextPath = localStorage.getItem( 'adminWebappContextPath' );
//        this.adminWebappUrl = localStorage.getItem( 'adminWebappUrl' );
//        this.casLoginUrl = localStorage.getItem( 'casLoginUrl' );
//        this.casLogoutUrl = localStorage.getItem( 'casLogoutUrl' );
//        console.log( 'Admin Service: Got from config.json' );
//        console.log( 'webClientUrl: ' + this.webClientUrl );
//        console.log( 'contextPath: ' + this.contextPath );
//        console.log( 'adminWebappUrl: ' + this.adminWebappUrl );
        this.loading = false;
        //if ( this.data === null )
        //this.data = this.getUser();
    }

    //returns an observable
    public getUser(): Observable<AdminUser> {
        return this.http.get<AdminUser>( this.configService.getAdminWebappContextPath()
                + this.configService.getProxyResourcePath()                
                + ConfigFileService.currentAdminEndPoint );
    }

    public getRoles() {
        return this.http.get<AdminUser>( this.configService.getAdminWebappContextPath()
                + this.configService.getProxyResourcePath()
                + ConfigFileService.adminRolesEndPoint );
    }

    public getUserById( id: string ) {
        return this.http.get<AdminUser>( this.configService.getAdminWebappContextPath()
                + this.configService.getProxyResourcePath()
                + ConfigFileService.adminUsersEndPoint + '/' + id );
    }

    public getAllUsers() {
        return this.http.get( this.configService.getAdminWebappContextPath()
                + this.configService.getProxyResourcePath()
                + ConfigFileService.adminUsersEndPoint );
    }

    public putUserUpdates( id: number, body: string ) {
        var url = this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + ConfigFileService.adminUsersUpdateEndPoint + id;
        //set headers
        let headers = new HttpHeaders().set( 'Content-Type', 'application/json; charset=utf-8' );
        headers.append( 'Accept', 'application/json' );

        return this.http.put( url, body, { headers } );
    }
    
    public getUserAgreementCurrent() {
        return this.http.get<UserAgreement>(this.configService.getAdminWebappContextPath()
                + this.configService.getProxyResourcePath()
                + ConfigFileService.adminUserAgreementEndPoint + '/current');
    }
    
    public postUserAgreement( id: number, body: string ) {
        var url = this.configService.getAdminWebappContextPath()
            + this.configService.getProxyResourcePath()
            + ConfigFileService.adminUserAgreementEndPoint;
        //set headers
        console.log('POST URL: ' + url);
        let headers = new HttpHeaders().set( 'Content-Type', 'application/json; charset=utf-8' );
        headers.append( 'Accept', 'application/json' );
        //return this.http.post( url, body, { headers } );
        return this.http.post( url, body, { headers, responseType: 'text' });
    }
    
    public getSessionProperties() {
        return this.http.get( this.configService.getAdminWebappContextPath()
                + ConfigFileService.adminSessionPropertiesEndPoint );
    }

    public doLogout() {
      //return this.http.get( this.contextPath + this.logoutSessionPath, {responseType: 'text'});
      //this.http.get( this.configService.getAdminWebappContextPath() +'/logout');
        return this.http.get( this.getCasmockLogoutUrl(), { responseType: 'text' } );        
    }

    public isProduction(){
        return this.configService.isProduction();
    }
    
    public getLoginUrl(){
        return this.configService.getAdminWebappContextPath() 
            + this.configService.getCasLoginUrl() 
            + '?webclient=' + this.configService.getWebClientUrl();
    }
    
    public getWebappContextPath(){
        return this.configService.getAdminWebappContextPath();
    }

    public doLogin() {
//        console.log( 'LOGGING IN from AdminServie: ' + this.getCasLoginUrl()
//                + 'webclient=' 
//                + localStorage.getItem( 'webClientUrl' ));
//        //        return this.http.get( this.getCasLoginUrl()
//        //                            + '?webclient=' + localStorage.getItem('webClientUrl') 
//        //                            + '/welcome', 
//        //                            {responseType: 'text'});
//        return this.http.get( this.contextPath + '/protected/login'
//            + '?webclient=' 
//            + localStorage.getItem( 'webClientUrl' ), { responseType: 'text' });
        
        console.log( 'LOGGING IN from AdminServie: ' + this.getCasLoginUrl()
                + '?service=' 
                + localStorage.getItem( 'webClientUrl' ));
        //        return this.http.get( this.getCasLoginUrl()
        //                            + '?webclient=' + localStorage.getItem('webClientUrl') 
        //                            + '/welcome', 
        //                            {responseType: 'text'});
        return this.http.get( this.getCasMockLoginUrl()
            + '?service=' 
            + this.getWebClientUrl(), { responseType: 'text' });
    }


    public getCurrUserId() {
        this.getUser().subscribe(data => {
            this.currUserId = data.id;
        });
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
    
    public getCasMockLoginUrl() {
        return this.configService.getCasLoginUrl();
    }
    
    public getCasmockLogoutUrl() {
        return this.configService.getCasLogoutUrl();
    }
    
    public isLoggedIn(){
        return this.configService.getLoggedIn();
    }
    
    public setLoggedIn(loggedIn:boolean){
        return this.configService.setLoggedIn(loggedIn);
    }

}
