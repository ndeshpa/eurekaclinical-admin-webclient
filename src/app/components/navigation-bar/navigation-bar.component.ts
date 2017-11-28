import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationBarComponent implements OnInit {
  isCollapsed: boolean = false;
  userId: number = 0;
  username: string = "New User";
  userArray: AdminUser[];

  constructor(private adminService: AdminService) { 
      this.adminService.getCurrUser().subscribe( data => 
      {
          console.log("In navigation constructor");
          console.log(this.username);
          console.log(data);
          console.log("fullName: ");
          console.log(data.fullName);
          this.userId = data.id;
          this.username = data.fullName;
          console.log("Now: ");
          console.log(this.username);
      });        
  }

  ngOnInit() {
  }
}
