import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

const UPDATE_USER_ENDPOINT = 'users/{id}';
const CURRENT_ADMIN_ENDPOINT = 'users/me';
const ADMIN_ROLES_ENDPOINT = 'roles';
const ADMIN_USERS_ENDPOINT = 'users';
const ADMIN_USERS_UPDATE_ENDPOINT = 'users/';
const ADMIN_USERS_AGREEMENT_ENDPOINT = 'useragreements';
const ADMIN_DESTROYSESSION_ENDPOINT = '/destroy-session';
const ADMIN_LOGOUT_ENDPOINT = '/logout';
const ADMIN_SESSION_PROPERTIES = '/get-session-properties';

@Injectable()
export class ConfigFileService {
    private config: Object = null;
    private env: Object = null;
    private loggedIn: boolean = false;

    constructor( private http: Http ) { }

    //get data from the config file
    public getConfig( key: any ) {
        return this.config[key];
    }
    
    public getWebClientUrl() {
        return this.config['webClientUrl'];
    }
    
    public getCasLoginUrl() {
        return this.config['casLoginUrl'];
    }
    
    public getCasLogoutUrl() {
        return this.config['casLogoutUrl'];
    }
    
    public getAdminWebappContextRoot() {
        return this.config['adminWebappUrl'];
    }
    
    public getAdminWebappContextPath() {
        return this.config['adminWebappContextPath'];
    }
    
    public getProxyResourcePath() {
        return this.config['proxyResourcePath'];
    }

    static get updateUserEndPoint() {
        return UPDATE_USER_ENDPOINT;
    }

    static get adminRolesEndPoint() {
        return ADMIN_ROLES_ENDPOINT;
    }
    
    static get currentAdminEndPoint() {
        return CURRENT_ADMIN_ENDPOINT;
    }
    
    static get adminUsersEndPoint() {
        return ADMIN_USERS_ENDPOINT;
    }
    
    static get adminUsersUpdateEndPoint() {
        return ADMIN_USERS_UPDATE_ENDPOINT;
    }
    
    static get adminDestroySessionEndPoint() {
        return ADMIN_DESTROYSESSION_ENDPOINT;
    }
    
    static get adminLogoutEndPoint() {
        return ADMIN_LOGOUT_ENDPOINT;
    }
    
    static get adminSessionPropertiesEndPoint() {
        return ADMIN_SESSION_PROPERTIES;
    }
    
    static get adminUserAgreementEndPoint() {
        return ADMIN_USERS_AGREEMENT_ENDPOINT;
    }
    
    public isProduction() {
        return environment.production;
    }
    
    public setLoggedIn(isLoggedIn: boolean){
        this.loggedIn = isLoggedIn;
    }
    
    public getLoggedIn(){
        return this.loggedIn;
    }

    //loads the config variables from config.json

    public load() {
        return new Promise(( resolve, reject ) => {
            let request: any = null;
            request = this.http.get( 'assets/config.json' );
            if ( request ) {
                request
                    .map( res => res.json() )
                    .subscribe(( responseData ) => {
                        this.config = responseData;
                        //for debugging --------------
//                        var cfg = JSON.stringify( responseData );
//                        JSON.parse( cfg, ( key, value ) => {
//                            //localStorage.setItem( key, value );     
//                            console.log(key + ':' + this.getConfig(key));
//                        } );
//
//                        console.log(ConfigFileService.updateUserEndPoint);
//                        console.log(ConfigFileService.adminUsersEndPoint);
//                        console.log(ConfigFileService.adminDestroySessionEndPoint);
//                        console.log(ConfigFileService.adminLogoutEndPoint);
//                        console.log(ConfigFileService.adminUsersUpdateEndPoint);
//                        console.log(ConfigFileService.adminRolesEndPoint);
//                        console.log(ConfigFileService.currentAdminEndPoint);
//                        console.log('CONFIG: Production?' + this.isProduction());
                        //for debugging --------------
                        resolve( true );
                    } );
            } else {
                console.error( 'Env config file "config.json" is not valid' );
                resolve( true );
            }
        } );
    }
}

