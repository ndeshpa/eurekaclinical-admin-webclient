import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { AdminService } from "./services/admin.service";
import { Subscription } from "rxjs/Rx";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';



@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html'
} )
export class AppComponent implements OnInit, OnDestroy {

    sessSubscription: Subscription;
    logoutSubscription: any;   
    currentUrl: any;   
    action: string;

    constructor( private activatedRoute: ActivatedRoute,
        private adminService: AdminService,
        private router: Router) {
     
    } 

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe( params => {
            this.action = params['action'];
        } );
    }

    ngOnDestroy(): void {
        this.adminService.setLoggedIn( false );
        if ( this.sessSubscription !== null )
            this.sessSubscription.unsubscribe();
    }

}
