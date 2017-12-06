import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';
import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';
import { Subscription } from 'rxjs/Rx';

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
  usrSubscription: Subscription;

  constructor(private adminService: AdminService, private router:Router) { 
  }

  ngOnInit() {
      this.usrSubscription = this.adminService.getCurrUser().subscribe( data => 
      {
          this.userId = data.id;
          this.username = data.fullName;
      });  
      if(this.router.url.endsWith('loggedOut'))
          this.isLoggedOut = true;
  }
  
  doLogin(){
      this.router.navigate(['/welcome']);
  }
  
  ngOnDestroy(): void {
      this.usrSubscription.unsubscribe();
  }
}
