import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';
import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';
import { Subscription } from 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';

@Component( {
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.css'],
    encapsulation: ViewEncapsulation.None
} )
export class NavigationBarComponent implements OnInit, OnDestroy {

    isCollapsed: boolean = false;
    userId: number = 0;
    username: string = 'User';
    userArray: AdminUser[] = [];
    isLoggedOut: boolean = false;
    isNewUser: boolean = true;
    usrSubscription: Subscription;
    errorMsg: string = '';
    adminWebappContextPath: string;
    webClientUrl: string;
    service: string;
    sessSubscription: Subscription;

    constructor( private adminService: AdminService, private router: Router ) {
    }

    ngOnInit() {
        console.log( 'NAVBAR - URL: ' + this.router.url );
        if ( !this.router.url.endsWith( 'welcome' ) ) {
            this.isNewUser = false;
            if ( this.router.url.endsWith( 'logout' ) ) {
                console.log( 'ON INIT Navbar - EXITING' );
                this.isNewUser = true;
                this.doLogout();
            }
            else if ( this.router.url.endsWith( 'loggedOut' ) ) {
                console.log( 'ON INIT Navbar - LOGGED OUT' );
                this.isNewUser = true;
                this.isLoggedOut = true;
            }
            else {
                console.log( 'ON INIT LOGGED IN' );
                this.isNewUser = false;
                this.isLoggedOut = false;
                this.getSessionProperties();
                this.getUserData();
            }
        }
        else {
            console.log( 'ON INIT Navbar - ENTRY' );
            this.isNewUser = true;
            this.isLoggedOut = true;
            this.adminWebappContextPath = localStorage.getItem('adminWebappContextPath');
            this.webClientUrl = localStorage.getItem( 'webClientUrl' );
        }
        
        

    }

    doLogin() {
        this.adminService.doLogin().subscribe( data => {
            //console.log( data );
        } );
        console.log( 'In Nav Bar: Logged in' );
        localStorage.setItem( 'loggedIn', 'true' );
        console.log( 'loggedIn Val: ' +  localStorage.getItem('loggedIn'));
        console.log( 'In Nav Bar: Getting userdata' );
        this.isNewUser = false;
        this.isLoggedOut = false;
        this.router.navigate(['/adminview']);
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

    getUserData() {
        this.usrSubscription = this.adminService.getUser().subscribe( data => {
            this.userId = data.id;
            this.username = data.fullName;
            console.log( 'UserId: ' + this.userId );
            console.log( 'UserName: ' + this.username );
        },
            error => {
                if ( error instanceof HttpErrorResponse ) {
                    this.errorMsg = 'SERVER ERROR: ' + error.message;
                }
                else {
                    this.errorMsg = 'Error Running Query. Please Retry';
                }
                console.log( 'ERROR IN NAVBAR' );
                console.log( error );
            },
            () => {
                console.log( 'SUCCESS in NAVBAR' );
            } );
    }

    doLogout() {
        this.adminService.doLogout().subscribe( data => {
            console.log( data );
        } );
        this.router.navigate( ['/welcome', 'loggedOut'] );
    }

    ngOnDestroy(): void {
 //       if ( this.usrSubscription !== null )
 //           this.usrSubscription.unsubscribe();
    }
}
