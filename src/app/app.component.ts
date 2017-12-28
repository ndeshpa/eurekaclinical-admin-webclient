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
    
    constructor(private adminService: AdminService, private router: Router) {
        this.getSessionProperties();
     }
    

    getSessionProperties(){
        this.sessSubscription = this.adminService.getSessionProperties().subscribe( data => {
            var sessTimeout = JSON.stringify( data );
            JSON.parse( sessTimeout, ( key, value ) => {
                localStorage.setItem(key,value);
            });
        });
    }


    ngOnInit() {  
        this.sessionTimeout = +localStorage.getItem('maxInactiveInterval');
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
    
    timerReset(timeoutSecs: any){
        this.getSessionProperties();
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
        this.sessSubscription.unsubscribe();
    }
 
}
