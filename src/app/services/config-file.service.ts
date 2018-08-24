import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';


@Injectable()
export class ConfigFileService {
    private config: Object = null;
    private env: Object = null;
    loggedIn: boolean = false;


    readonly UPDATE_USER_ENDPOINT = 'users/{id}';
    readonly CURRENT_ADMIN_ENDPOINT = 'users/me';
    readonly ADMIN_ROLES_ENDPOINT = 'roles';
    readonly ADMIN_USERS_ENDPOINT = 'users';
    readonly ADMIN_USERS_UPDATE_ENDPOINT = 'users/';
    readonly ADMIN_USERS_RETRIEVE_ENDPOINT = 'users/userDetails';
    readonly ADMIN_CREATE_USER_ENDPOINT = 'users';
    readonly ADMIN_USERS_AGREEMENT_ENDPOINT = 'useragreements';
    readonly ADMIN_REGISTRY_ENDPOINT_FILTERED = 'components?type=WEBAPP&type=EXTERNAL';
    readonly ADMIN_REGISTRY_COMPONENTS_ENDPOINT = 'components';
    readonly ADMIN_DESTROYSESSION_ENDPOINT = '/destroy-session';
    readonly ADMIN_LOGOUT_ENDPOINT = '/logout';
    readonly ADMIN_SESSION_PROPERTIES = '/get-session-properties';
    readonly ADMIN_SESSION = '/protected/get-session';
    readonly ADMIN_ALL_JOBS_ENDPOINT = 'jobs'; //need to make this jobs/all

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

    public getUpdateUserEndPoint() {
        return this.UPDATE_USER_ENDPOINT;
    }

    public getAdminRolesEndPoint() {
        return this.ADMIN_ROLES_ENDPOINT;
    }

    public getCurrentAdminEndPoint() {
        return this.CURRENT_ADMIN_ENDPOINT;
    }

    public getAdminAllJobsEndPoint() {
        return this.ADMIN_ALL_JOBS_ENDPOINT;
    }

    public getAdminUsersEndPoint() {
        return this.ADMIN_USERS_ENDPOINT;
    }

    public getAdminUsersUpdateEndPoint() {
        return this.ADMIN_USERS_UPDATE_ENDPOINT;
    }

    public getAdminCreateUserEndPoint() {
        return this.ADMIN_CREATE_USER_ENDPOINT;
    }

    public getAdminDestroySessionEndPoint() {
        return this.ADMIN_DESTROYSESSION_ENDPOINT;
    }

    public getAdminLogoutEndPoint() {
        return this.ADMIN_LOGOUT_ENDPOINT;
    }

    public getAdminSessionPropertiesEndPoint() {
        return this.ADMIN_SESSION_PROPERTIES;
    }

    public getAdminSessionEndPoint() {
        return this.ADMIN_SESSION;
    }

    public getAdminUserAgreementEndPoint() {
        return this.ADMIN_USERS_AGREEMENT_ENDPOINT;
    }

    public getAdminRegistryComponentsEndPoint() {
        return this.ADMIN_REGISTRY_COMPONENTS_ENDPOINT;
    }

    public getAdminRegistryEndPointFiltered() {
        return this.ADMIN_REGISTRY_ENDPOINT_FILTERED;
    }

    public getAdminRetrieveUsersEndPoint() {
        return this.ADMIN_USERS_RETRIEVE_ENDPOINT;
    }

    public isProduction() {
        return environment.production;
    }

    public setLoggedIn( isLoggedIn: boolean ) {
        this.loggedIn = isLoggedIn;
    }

    public getLoggedIn() {
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
                        resolve( true );
                    } );
            } else {
                console.error( 'Env config file "config.json" is not valid' );
                resolve( true );
            }
        } );
    }
}

