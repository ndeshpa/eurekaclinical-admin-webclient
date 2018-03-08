import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { AdminService } from "./services/admin.service";
import { Subscription } from "rxjs/Rx";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html'
} )
export class AppComponent implements OnInit, OnDestroy {

    sessSubscription: Subscription;
    logoutSubscription: any;
    timeOut: boolean = false;
    sessionStarted: boolean = false;
    sessionTimeout: any;
    currentUrl: any;
    timer: any;
    finalTimer: any;
    sessionStartTime: any;
    graceSecs = 150;
    action:string;

    constructor( private activatedRoute: ActivatedRoute,
            private adminService: AdminService, 
            private router: Router) {
    }


    getSessionProperties() {
        //get current time and save in localStorage
        this.sessSubscription = this.adminService.getSessionProperties().subscribe( data => {
            var sessTimeout = JSON.stringify( data );
            JSON.parse( sessTimeout, ( key, value ) => {
                localStorage.setItem( key, value );
            } );
        } );
    }


    ngOnInit() {
        this.activatedRoute.queryParams.subscribe( params => {
            this.action = params['action'];
        } );
        this.activatedRoute.data.subscribe(myData =>{
            console.log('IN APP COMPONENT DATA:');
            console.log(myData);
        });
        this.activatedRoute.url.subscribe(data => {
            console.log('IN APP COMPONENT URL:');
            console.log(data.toString());
        });
        console.log('IN APP COMPONENT:' + this.action);
        console.log('IN APP COMPONENT loggedIn:' + this.adminService.isLoggedIn());
        var sessTO = localStorage.getItem( 'maxInactiveInterval' );  
        this.sessionStarted = this.adminService.isLoggedIn();
        //this.getSessionProperties();
        if(sessTO !== null){
            this.timeOut = false;
            this.sessionTimeout = +sessTO - 180;
            this.timerReset();
            console.log('From AppComponent: timeout = ' + this.sessionTimeout);
        }
        
        //this.sessionTimeout = 10; //for testing timeout
        //this.graceSecs = 5; //for testing timeout
        
    }


    doTimedout() {
        this.timeOut = false;
        this.logoutSubscription = this.adminService.doLogout();
        this.logoutSubscription.subscribe( myData => {
            console.log( 'logged out' );
        } );
        this.router.navigate( ['/welcome', 'loggedOut'] );
    }
    
    graceTimeout(){
        this.finalTimer = setTimeout(() => {
            this.doTimedout();
        }, this.graceSecs * 1000 );
    }

    @HostListener( 'document:mousemove' ) onMouseMove() {
        localStorage.setItem( 'timeOut', 'false' );
        this.timerReset();
    }

    @HostListener( 'document:click' ) onClick() {
        localStorage.setItem( 'timeOut', 'false' );
        this.timerReset();
    }

    @HostListener( 'document:keyup' ) onKeyUp() {
        localStorage.setItem( 'timeOut', 'false' );
        this.timerReset();
    }

    @HostListener( 'document:keydown' ) onKeyDown() {
        localStorage.setItem( 'timeOut', 'false' );
        this.timerReset();
    }
    //give 2 minutes advance warning
    timerReset() {
        this.timeOut = false;
        localStorage.setItem( 'timeOut', 'false' );
        if ( this.timer !== null )
            clearTimeout( this.timer );
        if (this.finalTimer !== null)
            clearTimeout(this.finalTimer);
        this.currentUrl = this.router.url;
        localStorage.setItem( 'currUrl', this.currentUrl );
        if ( !this.router.url.endsWith( 'loggedOut' ) ) {
            this.timer = setTimeout(() => {
                this.timeOut = true;
                localStorage.setItem( 'timeOut', 'true' );
                this.graceTimeout();
            }, this.sessionTimeout * 1000 );
        }
    }

    resetSession() {
        if ( this.timer !== null )
            clearTimeout( this.timer );
        if (this.finalTimer !== null)
            clearTimeout(this.finalTimer);
        localStorage.setItem( 'timeOut', 'false' );
        this.timeOut = false;
        this.getSessionProperties();
        this.router.navigateByUrl( localStorage.getItem( 'currUrl' ) );
    }

    ngOnDestroy(): void {
        //localStorage.setItem('loggedIn', 'false');
        this.adminService.setLoggedIn(false);
        if ( this.sessSubscription !== null )
            this.sessSubscription.unsubscribe();
    }

}
