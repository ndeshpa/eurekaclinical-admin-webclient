import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Role } from '../../models/role';
import { AdminUser } from '../../models/admin-user';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';

@Component( {
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./edit-user.component.css']
} )
export class EditUserComponent implements OnInit, OnDestroy {

    id: any;
    action: any;
    data: any;
    userRoles: Role[] = [];
    userVerified: string = 'Not Verified';
    userActivated: string = 'Inactive';
    changedStatus = false;
    model: AdminUser = new AdminUser();
    usrSubscription: Subscription;
    roleSubscription: Subscription;
    errorMsg: string = '';

    //patterns for validation
    usernamePattern = "^[a-z0-9]{8,15}$";
    namePattern = "^[a-zA-Z]+$";

    isValidFormSubmitted = false;


    constructor( private activatedRoute: ActivatedRoute,
        private router: Router,
        private adminService: AdminService,
        private modalService: NgbModal ) { }

    ngOnInit() {

        this.activatedRoute.params.subscribe( params => {
            this.id = params['id'];
            this.action = params['action'];
        } );
        //get roles
        this.roleSubscription = this.adminService.getRoles().subscribe( data => {
            this.data = data;
            for ( var i = 0; i < this.data.length; i++ ) {
                this.userRoles[i] = {
                    'id': this.data[i].id,
                    'name': this.data[i].name,
                    'isChecked': false
                }
            }
        },
            err => {
                if ( err instanceof HttpErrorResponse ) {
                    this.errorMsg = 'Server Error: ' + err.message;
                }
                else {
                    this.errorMsg = 'Error Running Query. Please Retry';
                }
            },
            () => {
                console.log( 'SUCCESS in EDITUSER' );
            } );
        //get user details
        this.usrSubscription = this.adminService.getUserById( this.id ).subscribe( data => {
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

            if ( this.model.verified )
                this.userVerified = 'Verified';
            if ( this.model.active )
                this.userActivated = 'Activated';
            //iterate through userRoles array and set isChecked = true
            //if the data has that role
            for ( var i = 0; i < this.userRoles.length; i++ ) {
                var roleId = this.userRoles[i].id;
                if ( this.model.roles.indexOf( roleId ) >= 0 ) {
                    this.userRoles[i].isChecked = true;
                }
            }
        },
            error => {
                if ( error instanceof HttpErrorResponse ) {
                    this.errorMsg = 'Server Error: ' + error.message;
                }
                else {
                    this.errorMsg = 'Error Running Query. Please Retry';
                }
            },
            () => {
                console.log( 'SUCCESS in EDITUSER' );
            } );
    }

    inactivateUser( myModel: AdminUser ) {
        myModel.active = false;
        //convert model to json              
        var input = JSON.stringify( myModel );
        //call put to edit info    
        this.adminService.putUserUpdates( myModel.id, input );
    }


    onSubmit( editForm: NgForm) {
        //, model: AdminUser 
        this.isValidFormSubmitted = false;
        if ( editForm.invalid ) {
            return;
        }
        this.isValidFormSubmitted = true;

        //transmit changes to roles
        this.model.roles = new Array<any>();
        for ( var i = 0; i < this.userRoles.length; i++ ) {
            if ( this.userRoles[i].isChecked ) {
                this.model.roles.push( this.userRoles[i].id );
            }
        }
        //convert model to json              
        var input = JSON.stringify( this.model );
        //call put to edit info    
        this.adminService.putUserUpdates( this.model.id, input )
            .subscribe( data => { },
            error => {
                if ( error instanceof HttpErrorResponse ) {
                    this.errorMsg = 'Server Error: ' + error.message;
                }
                else {
                    this.errorMsg = 'Error Running Query. Please Retry';
                }
            },
            () => {
                console.log( 'SUCCESS in EDITUSER' );
            } );
        this.router.navigateByUrl( '/adminview' );

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

    changeActive( content ) {
        this.model.active = !this.model.active;
        if ( this.model.active )
            this.userActivated = 'Active';
        else
            this.userActivated = 'Inactive';
        this.changedStatus = true;
        this.modalService.open( content ).result
            .then(( result ) => {
                this.changedStatus = true;
            },
            ( reason ) => {
            } );
    }

    ngOnDestroy(): void {
        if ( this.usrSubscription !== null )
            this.usrSubscription.unsubscribe();
        if ( this.roleSubscription !== null )
            this.roleSubscription.unsubscribe();
    }
}


