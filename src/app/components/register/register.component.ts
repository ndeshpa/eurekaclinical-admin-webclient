import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
    model: AdminUser = new AdminUser();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private adminService: AdminService) { }

  ngOnInit() {
  }
   
  onSubmit( model: AdminUser, isValid: boolean ) {
      console.log( model, isValid );
      //assign both admin and research roles for now
      this.model.roles = new Array<any>();
      this.model.roles.push(1);
      this.model.roles.push(2);
      this.model.type = "LOCAL";
      this.model.username = this.model.fullName;
      this.model.active = true;
      this.model.loginType = "INTERNAL";
      this.model.verified = true;
      this.model.password = "password";
     
      //convert model to json              
      var input = JSON.stringify(this.model);
      console.log("POST");
      console.log(input);
      //call post to add info    
      this.adminService.postUser(input);
      //redirect to registration info page       
      this.router.navigate( ['/adminview'] );
  }
}
