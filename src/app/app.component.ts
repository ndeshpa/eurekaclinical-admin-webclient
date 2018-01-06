import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { AdminService } from "./services/admin.service";
import { Subscription } from "rxjs/Rx";
import { Router } from '@angular/router';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit, OnDestroy {
    
    sessSubscription: Subscription;
    logoutSubscription: any;
    timeOut: boolean = false;
    sessionTimeout: any;
    currentUrl: any;
    timer: any;
    sessionStartTime: any;
    
    constructor(private adminService: AdminService, private router: Router) {
        
     }
    

    getSessionProperties(){
        //get current time and save in localStorage
        this.sessSubscription = this.adminService.getSessionProperties().subscribe( data => {
            var sessTimeout = JSON.stringify( data );
            JSON.parse( sessTimeout, ( key, value ) => {
                localStorage.setItem(key,value);
            });
        });
    }


    ngOnInit() {  
        this.getSessionProperties();
        this.sessionTimeout = +localStorage.getItem('maxInactiveInterval') - 180;
        //this.sessionTimeout = 10; //for testing timeout
        this.timerReset(this.sessionTimeout);      
      }
    
  
    doTimedout(){
        this.logoutSubscription = this.adminService.doLogout();
        this.logoutSubscription.subscribe( myData => {
            console.log('logged out');
        });
        this.router.navigate(['/welcome']);
    }
    
    @HostListener('document:mousemove') onMouseMove() { 
        localStorage.setItem('timeOut', 'false');
        this.timerReset(this.sessionTimeout);
      }
    
    @HostListener('document:click') onClick() { 
        localStorage.setItem('timeOut', 'false');
        this.timerReset(this.sessionTimeout);
      }
    
    @HostListener('document:keyup') onKeyUp() { 
        localStorage.setItem('timeOut', 'false');
        this.timerReset(this.sessionTimeout);
      }
    
    @HostListener('document:keydown') onKeyDown() { 
        localStorage.setItem('timeOut', 'false');
        this.timerReset(this.sessionTimeout);
      }
    //give 2 minutes advance warning
    timerReset(timeoutSecs: any){
        if(this.timer !== null)
            clearTimeout(this.timer);
        localStorage.setItem('timeOut', 'false');
        if(!this.router.url.endsWith('timeout')){
            this.currentUrl = this.router.url;
            localStorage.setItem('currUrl', this.currentUrl);
        }   
        if(!this.router.url.endsWith('loggedOut')){
            this.timer = setTimeout(() => {
                localStorage.setItem('timeOut', 'true');
                this.router.navigate(['/timeout']);
            }, timeoutSecs*1000);
        }
        
    }
    
    ngOnDestroy(): void {
        if(this.sessSubscription !== null)
            this.sessSubscription.unsubscribe();
    }
 
}
