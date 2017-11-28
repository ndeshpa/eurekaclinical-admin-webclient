import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';

@Component( {
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css'],
    encapsulation: ViewEncapsulation.None
} )
export class EditUserComponent implements OnInit {
    id: any;
    action: any;
    userRoles: any;
    userVerified: string = 'Not Verified';
    userActivated: string = 'Not Activated';
    deleteUser: boolean = false;
    userData: any;
    model: AdminUser;

    constructor( private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private adminService: AdminService) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe( params => {
            console.log( params['id'] + ' ' + params['action'] );
            this.id = params['id'];
            this.action = params['action'];
            if ( this.action === 'delete' )
                this.deleteUser = true;
        } );
        this.adminService.getCurrUser().subscribe( data => 
        {   
            this.model = new AdminUser();
            this.model.type = data.type;
            this.model.id = data.id;
            this.model.username = data.username;
            this.model.roles = data.roles;
            this.model.created = data.created;
            this.model.active = data.active;
            this.model.firstName = data.firstName;
            this.model.lastName = data.lastName;
            this.model.fullName = data.fullName;
            this.model.email = data.email;
            this.model.organization = data.organization;
            this.model.lastLogin = data.lastLogin;
            this.model.title = data.title;
            this.model.department = data.department;
            this.model.loginType = data.loginType;
            this.model.verified = data.verified;
            this.model.verificationCode = data.verificationCode;
            this.model.password = data.password;
            this.model.passwordExpiration = data.passwordExpiration;
            
            if(this.model.verified)
               this.userVerified = 'Verified';
            if(this.model.active)
                this.userActivated = 'Activated';
            
            this.userRoles = new Array<any>();
            for(var i=0; i< this.model.roles.length; i++){
                switch(this.model.roles[i]) {
                case 1:
                    this.userRoles.push({
                        name: 'Admin',
                        isChecked: true
                      });
                    break;
                case 2:
                    this.userRoles.push({
                        name: 'Researcher',
                        isChecked: true
                      });
                    break;
                }
            }
        });        
    }

    onSubmit( model: AdminUser, isValid: boolean ) {
        //transmit changes to roles
        this.model.roles = new Array<any>();
        for(var i=0; i<this.userRoles.length; i++){
           if((this.userRoles[i].name === "Admin") &&  (this.userRoles[i].isChecked))
                this.model.roles.push(1);
            if((this.userRoles[i].name === "Researcher") &&  (this.userRoles[i].isChecked))
                this.model.roles.push(2);
        }
        //convert model to json              
        var input = JSON.stringify(this.model);
        //call put to edit info    
        this.adminService.putUserUpdates(this.model.id, input);
        //redirect to registration info page       
        this.router.navigate( ['/editUser/edit/' + this.model.id] );
    }

    OnCancelDelete() {
        console.log('Canceled DeleteUser');
        //redirect to registration info page
        this.router.navigate( ['/adminview'] );
    }

    OnConfirmDelete() {
        //delete using API
        console.log('Deleted user');
      //redirect to registration info page
        this.router.navigate( ['/adminview'] );
    }
    
    changeCheckbox(i) {
        console.log("Change ROLE for: " + i);
        if (this.userRoles) {
          this.userRoles[i].isChecked = !this.userRoles[i].isChecked;
        }
      }  
}
