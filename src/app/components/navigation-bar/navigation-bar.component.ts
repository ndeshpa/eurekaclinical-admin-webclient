import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';
import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';
import { Subscription } from 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';
import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";
import { Keepalive } from "@ng-idle/keepalive";
import { RegistryEntry } from "../../models/registry-entry";

@Component( {
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html'
} )
export class NavigationBarComponent implements OnInit, OnDestroy {

    isCollapsed: boolean = false;
    userId: number = 0;
    username: string = 'User';
    userArray: AdminUser[] = [];
    isEditUserPage: boolean = false;
    isNewUser: boolean = true;
    errorMsg: string = '';
    adminWebappContextPath: string;
    currUrl: string;
    webClientUrl: string;
    loginUrl: string;
    service: string;
    usrSubscription: Subscription;
    regSubscription: Subscription;
    roleSubscription: Subscription;
    sessSubscription: Subscription;
    isProd: boolean = false;

    sessionTimeout: number;
    sessionExpiring: boolean = false;
    graceSecs = 150;
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    //for registry entries
    data: any;
    regData: RegistryEntry[] = [];


    constructor( private adminService: AdminService, private router: Router,
        private idle: Idle, private keepalive: Keepalive ) {
    }

    ngOnInit() {
        this.currUrl = '/#' + this.router.url;
        //get userId for editUser page
        if ( this.router.url.indexOf( 'editUser' ) >= 0 ) {
            this.userId = +this.router.url.substring( this.router.url.lastIndexOf( '/' ) + 1 );
            this.isEditUserPage = true;
        }
        this.adminWebappContextPath = this.adminService.getWebappContextPath();
        this.webClientUrl = this.adminService.getWebClientUrl();
        this.isProd = this.adminService.isProduction();
        if ( this.isProd ) {
            this.loginUrl = this.adminWebappContextPath + '/protected/login?webclient=' +
                this.webClientUrl + '/%23/welcome/loggedIn';
        } else {
            if(!this.adminService.isLoggedIn()){
                this.adminService.setLoggedIn( true );
                this.isNewUser = false;
                this.router.navigate( ['/adminview'] );
            }
            else {
                this.router.navigate([this.router.url]);
            }                
        }
        if ( !this.router.url.endsWith( 'welcome' ) ) {
            this.isNewUser = false;
            if ( this.router.url.endsWith( 'logout' ) ) {
                this.isNewUser = true;
            }
            else if ( this.router.url.endsWith( 'loggedIn' ) ) {
                this.adminService.setLoggedIn( true );
                this.isNewUser = false;
                this.router.navigate( ['/adminview'] );
            }
            else {
                this.setupUser();
            }
        }
        else {
            //see if a session exists for this user, if yes, set isNewUser to false
            this.isNewUser = true;
            this.sessSubscription = this.adminService.getSession().subscribe( data => {
                if(data.indexOf('OK') >= 0){
                    this.isNewUser = false;
                    this.setupUser();
                }                    
            } );           
        }
        this.startIdleTimer();
    }
    
    setupUser(){
        this.getSessionProperties();
        this.getUserData();
        if (this.isProd ) {
            this.getRegistryEntries();    
        }
    }

    startIdleTimer() {
        if ( localStorage.getItem( 'sessionTimeout' ) === '0' )
            this.sessionTimeout = 600;
        else
            this.sessionTimeout = +localStorage.getItem( 'sessionTimeout' )
        // sets an idle timeout for session timeout seconds
        this.idle.setIdle( this.sessionTimeout );
        //this.idle.setIdle( 10 ); //for testing
        // sets a grace period after which, the user will be timed out.
        this.idle.setTimeout( this.graceSecs );
        //this.idle.setTimeout( 5 ); //for testing
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        this.idle.setInterrupts( DEFAULT_INTERRUPTSOURCES );

        this.idle.onIdleEnd.subscribe(() => this.idleState = 'Session Idle.' );
        this.idle.onTimeout.subscribe(() => {
            this.idleState = 'Timed out!';
            this.timedOut = true;
            window.location.href = this.adminService.getAdminWebappUrl() + '/logout';
        } );
        this.idle.onIdleStart.subscribe(() => {
            this.idleState = 'Session Idle!';
            this.sessionExpiring = true;
        } );
        this.idle.onTimeoutWarning.subscribe(( countdown ) => this.idleState = 'You will time out in ' + countdown + ' seconds!' );

        // sets the ping interval to 15 seconds
        this.keepalive.interval( 15 );
        this.keepalive.onPing.subscribe(() => this.lastPing = new Date() );
        this.resetIdleTimer();
    }

    resetIdleTimer() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
        this.sessionExpiring = false;
        this.getSessionProperties();
    }

    getRegistryEntries() {
        this.regSubscription = this.adminService.getRegistryEntries().subscribe( data => {
            this.data = data;
            for ( var i = 0; i < this.data.length; i++ ) {
                if ( this.data[i].url !== this.adminService.getWebClientUrl() ) {
                    var regEntry: RegistryEntry = new RegistryEntry();
                    regEntry.displayName = this.data[i].displayName;
                    regEntry.url = this.data[i].url;
                    this.regData.push( regEntry );
                }
            }
        },
            error => {
                if ( error instanceof HttpErrorResponse ) {
                    this.errorMsg = 'Server Error: ' + error.message;
                }
                else {
                    this.errorMsg = 'Error Running Query. Please Retry';
                }
            },
            () => {
                console.log( 'SUCCESS in ADMINVIEW' );
            } );

    }

    getSessionProperties() {
        this.adminService.setSessTimeoutInterval();
    }

    getUserData() {
        this.usrSubscription = this.adminService.getUser().subscribe( data => {
            this.userId = data.id;
            this.username = data.fullName;
        },
            error => {
                if ( error instanceof HttpErrorResponse ) {
                    this.errorMsg = 'SERVER ERROR: ' + error.message;
                }
                else {
                    this.errorMsg = 'Error Running Query. Please Retry';
                }
            },
            () => {
                console.log( 'SUCCESS in NAVBAR' );
            } );
    }

    ngOnDestroy(): void {
        if ( this.usrSubscription )
            this.usrSubscription.unsubscribe();
        if ( this.regSubscription )
            this.regSubscription.unsubscribe();
        if ( this.roleSubscription )
            this.roleSubscription.unsubscribe();
        if ( this.sessSubscription )
            this.sessSubscription.unsubscribe();
    }
}
