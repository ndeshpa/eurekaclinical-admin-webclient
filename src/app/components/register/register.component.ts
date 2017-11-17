import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AdminUser } from '../../models/admin-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
    model: AdminUser = new AdminUser();

  constructor(private router: Router) { }

  ngOnInit() {
  }
   
  onSubmit(model: AdminUser, isValid: boolean){
      console.log(model, isValid);
      //post the value to the API 
      //redirect to registration info page
      this.router.navigate(['/welcome']);
  }

}
