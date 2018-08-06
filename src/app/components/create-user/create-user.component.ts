import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminUser } from "../../models/admin-user";
import { AdminService } from '../../services/admin.service';
import { Role } from '../../models/role';

@Component( {
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./create-user.component.css']
} )
export class CreateUserComponent implements OnInit {
    errorMsg: string = '';
    model: AdminUser = new AdminUser();
    userRoles: Role[] = [];
    userVerified: string = 'Verified';
    userActivated: string = 'Activated';
    //verifyPassword: string;
    role: Role;
    password: string;

    constructor( private activatedRoute: ActivatedRoute,
        private router: Router,
        private adminService: AdminService ) { }

    ngOnInit() {
        this.role = new Role();
        this.role.id = 1;
        this.role.name = 'researcher';
        this.role.isChecked = true;
        this.userRoles.push( this.role );
        this.role = new Role();
        this.role.id = 2;
        this.role.name = 'admin';
        this.userRoles.push( this.role );
        this.password = this.adminService.createRandomPassword(8);
        this.model.password = this.password;
        //this.verifyPassword = this.password;
    }

    onSubmit() {
        var hasErrors: boolean = false;
        this.errorMsg = 'Please fix error in field(s):';
        //this.checkRequiredFields( this.model.firstName, this.model.lastName, this.model.username, this.model.email );
        if ( this.model.firstName === undefined || this.invalidField( this.model.firstName ) ) {
            this.errorMsg += ' Firstname';
            hasErrors = true;
        }
        if ( this.model.lastName === undefined || this.invalidField( this.model.lastName ) ) {
            this.errorMsg += ' Lastname';
            hasErrors = true;
        } 
        if ( this.model.username === undefined ) {
            this.errorMsg += ' Username';
            hasErrors = true;
        } 
        if ( this.model.email === undefined ) {
            this.errorMsg += ' Email';
            hasErrors = true;
        }
        if(hasErrors){
            this.errorMsg.trim();
            this.router.navigate( ['/createUser'] );
        }
        else {
            this.model.type = 'LOCAL'; //verify if OK
            //add password and pwd reenter boxed. A check box for admin to require the pwd reset (if checked, set pwd 
            //expiration to a past date
            //this.model.password = 'temp1234'; //verify if OK set expiration date to be in the past
            //transmit roles
            this.model.roles = new Array<any>();
            for ( var i = 0; i < this.userRoles.length; i++ ) {
                if ( this.userRoles[i].isChecked ) {
                    this.model.roles.push( this.userRoles[i].id );
                }
            }
            this.model.verified = true;
            this.model.active = true;
            //convert model to json              
            var input = JSON.stringify( this.model );
            //call post to save info    
            this.adminService.postNewUser( input )
                .subscribe( data => { },
                error => {
                    if(error.status === 409)
                        this.errorMsg = 'Username already taken. Please type in a different Username';
                    this.router.navigateByUrl( '/createUser' );
                },
                () => {
                    this.router.navigateByUrl( '/adminview' );
                } );
        }
    }

    invalidField( name: string ) {
        if ( !name.match( /^[a-z]+$/gi ) ) {
            return true;
        }
        else {
            return false;
        }
    }


    restoreForm() {
        this.router.navigateByUrl( '/adminview' );
    }

    changeCheckbox( i ) {
        for ( var j = 0; j < this.userRoles.length; j++ ) {
            if ( this.userRoles[j].id === i ) {
                this.userRoles[j].isChecked = !this.userRoles[j].isChecked;
            }
        }
    }
    
    showPassword() {
        var pwd = (<HTMLInputElement>document.getElementById("password"));
        if (pwd.type === "password") {
            pwd.type = "text";
        } else {
            pwd.type = "password";
        }
    }

    forcePasswordReset(){
        var today = new Date();
        this.model.passwordExpiration = new Date(today.getFullYear()-1, today.getMonth(), today.getDate());
        console.log('EXPIRATION DATE:' + this.model.passwordExpiration);
    }
}
