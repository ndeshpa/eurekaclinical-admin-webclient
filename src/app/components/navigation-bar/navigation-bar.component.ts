import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';
import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';
import { Subscription } from 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  isCollapsed: boolean = false;
  userId: number = 0;
  username: string = "New User";
  userArray: AdminUser[] = [];
  isLoggedOut: boolean = false;
  isNewUser: boolean = true;
  usrSubscription: Subscription;
  errorMsg: string ='';
  adminWebappUrl: string;
  service: string;

  constructor(private adminService: AdminService, private router:Router) { 
  }

  ngOnInit() {
      if(!this.router.url.endsWith('welcome')){
          this.isNewUser = false;
      }
      if(this.router.url.endsWith('logout')){
          this.isNewUser = true;
          this.doLogout();
      }
      this.usrSubscription = this.adminService.getCurrUser().subscribe( data => 
      {
          this.userId = data.id;
          this.username = data.fullName;
      },
      error => {
          if (error instanceof HttpErrorResponse) {
              this.errorMsg = 'SERVER ERROR: ' + error.message;
          }
          else{
              this.errorMsg = 'Error Running Query. Please Retry';
          }
          console.log('ERROR IN ADMINVIEW');
          console.log(error);
      },
      () => {
          console.log('SUCCESS in NAVBAR');
      });  
      if(this.router.url.endsWith('loggedOut'))
          this.isLoggedOut = true;
  }
  
  doLogin(){
      this.adminService.doLogin().subscribe(data => { 
          console.log(data);
      });
  }
  
  doLogout() {
      this.adminService.doLogout().subscribe(data => { 
          console.log(data);
      });
      this.router.navigate( ['/welcome', 'loggedOut'] );
  }
  
  ngOnDestroy(): void {
      if(this.usrSubscription !== null)
          this.usrSubscription.unsubscribe();
  }
}
