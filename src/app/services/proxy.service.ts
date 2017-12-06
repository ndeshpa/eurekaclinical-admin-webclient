import { Injectable } from '@angular/core';
import { ConfigFileService } from './config-file.service';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProxyService {

    constructor( private http: Http ) { }

    destroySession() {
        return this.http.get( this.getOpenEndpoint() + '/destroy-session' )
            .map( response => response.json() )
            .subscribe( data => console.log( data ) );
    }

    getOpenEndpoint() {
        return 'eureka-webapp';
    }
}
