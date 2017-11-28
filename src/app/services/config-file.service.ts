import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigFileService {
    private config: Object = null;
    private env: Object = null;

    constructor( private http: Http ) { }

    //get data from the config file
    public getConfig( key: any ) {
        return this.config[key];
    }

    //get env information - dev vs prod
    public getEnv( key: any ) {
        return this.env[key];
    }

    //loads the config variables from config.[env].json for dev or prod

    public load() {
        return new Promise(( resolve, reject ) => {
            this.http.get( 'env.json' ).map( res => res.json() ).catch(( error: any ): any => {
                console.log( "configuration file env.json could not be read" );
                resolve( true );
                return Observable.throw( error.json().error || 'Server Error' );
            } ).subscribe(( envResponse ) => {
                this.env = envResponse;
                let request: any = null;

                switch ( envResponse.env ) {
                    case 'dev': {
                        request = this.http.get( 'config.' + envResponse.env + '.json' );
                    } break;
                    case 'prod': {
                        request = this.http.get( 'config.' + envResponse.env + '.json' );
                    }
                    case 'default': {
                        console.error( 'Config file is not set or invalid' );
                        resolve( true );
                    } break;
                }

                if ( request ) {
                    request
                        .map( res => res.json())
                        .catch(( error: any ) => {
                            console.error( 'Error reading ' + envResponse.env + ' configuration file' );
                            resolve( error );
                            return Observable.throw( error.json().error || 'Server error' );
                        })
                        .subscribe(( responseData ) => {
                            this.config = responseData;
                            resolve( true );
                        });
                } else {
                    console.error( 'Env config file "env.json" is not valid' );
                    resolve( true );
                }
            } );
        } );
    }

}
