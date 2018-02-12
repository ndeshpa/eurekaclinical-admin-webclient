import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigFileService {
    private config: Object = null;
    private env: Object = null;

    constructor( private http: Http ) { }

    //get data from the config file
    public getConfig( key: any ) {
        return this.config[key];
    }

    //loads the config variables from config.[env].json for dev or prod

    public load() {
        return new Promise(( resolve, reject ) => {
            localStorage.setItem('webClientUrl', 'https://eurekadev.bmi.emory.edu/eurekaclinical-admin-webclient');
            localStorage.setItem('casLoginUrl', 'https://eurekadev.bmi.emory.edu/cas-server/login');
            localStorage.setItem('casLogoutUrl', 'https://eurekadev.bmi.emory.edu/cas-server/logout');
            localStorage.setItem('logoutUrl', 'https://eurekadev.bmi.emory.edu/cas-server/logout');
            localStorage.setItem('adminWebappUrl', 'https://eurekadev.bmi.emory.edu/eurekaclinical-admin-webapp');
            localStorage.setItem('adminWebappContextPath', '/eurekaclinical-admin-webapp');
            
//            let request: any = null;
//            request = this.http.get( './assets/config.json' );
//            if ( request ) {
//                request
//                    .map( res => res.json() )
//                    .catch(( error: any ) => {
//                        console.error( 'Error reading configuration file' );
//                        resolve( error );
//                        return Observable.throw( error.json().error || 'Server error' );
//                    } )
//                    .subscribe(( responseData ) => {
//                        this.config = responseData;
//                        var cfg = JSON.stringify(responseData);
//                        JSON.parse(cfg, (key, value) => {
//                            localStorage.setItem(key, value);
//                        });
//                        resolve( true );
//                    });
//            } else {
//                console.error( 'Env config file "config.json" is not valid' );
//                resolve( true );
//            }
        } );
    }
}
