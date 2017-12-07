import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Rx';

@Component( {
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css'],
    encapsulation: ViewEncapsulation.None
} )
export class EditUserComponent implements OnInit, OnDestroy {

    id: any;
    action: any;
    userRoles: any;
    userVerified: string = 'Not Verified';
    userActivated: string = 'Not Activated';
    deleteUser: boolean = false;
    submitted: boolean = false;
    userData: any;
    model: AdminUser = new AdminUser();
    closeResult: string;
    buttonVal: string = 'Submit';
    usrSubscription: Subscription;

    constructor( private activatedRoute: ActivatedRoute,
        private router: Router,
        private adminService: AdminService,
        private modalService: NgbModal ) { }

    ngOnInit() {

        this.activatedRoute.params.subscribe( params => {
            this.id = params['id'];
            this.action = params['action'];
            if ( this.action === 'delete' ) {
                this.deleteUser = true;
            }
        } );

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

            this.userRoles = new Array<any>();
            for ( var i = 0; i < this.model.roles.length; i++ ) {
                switch ( this.model.roles[i] ) {
                    case 1:
                        this.userRoles.push( {
                            name: 'Admin',
                            isChecked: true
                        } );
                        break;
                    case 2:
                        this.userRoles.push( {
                            name: 'Researcher',
                            isChecked: true
                        } );
                        break;
                }
            }
        } );
    }

    inactivateUser( myModel: AdminUser ) {
        myModel.active = false;
        //convert model to json              
        var input = JSON.stringify( myModel );
        //call put to edit info    
        this.adminService.putUserUpdates( myModel.id, input );
    }

    onSubmit( model: AdminUser, isValid: boolean ) {
        this.submitted = true;
        //transmit changes to roles
        this.model.roles = new Array<any>();
        for ( var i = 0; i < this.userRoles.length; i++ ) {
            if ( ( this.userRoles[i].name === "Admin" ) && ( this.userRoles[i].isChecked ) )
                this.model.roles.push( 1 );
            if ( ( this.userRoles[i].name === "Researcher" ) && ( this.userRoles[i].isChecked ) )
                this.model.roles.push( 2 );
        }
        //convert model to json              
        var input = JSON.stringify( this.model );
        //call put to edit info    
        this.adminService.putUserUpdates( this.model.id, input )
            .subscribe( data => console.log( data ) );
        this.router.navigateByUrl( 'adminview' );
    }

    restoreForm() {
        this.router.navigateByUrl( '/adminview' );
    }

    changeCheckbox( i ) {
        if ( this.userRoles ) {
            this.userRoles[i].isChecked = !this.userRoles[i].isChecked;
        }
    }

    changeActive( content ) {
        this.model.active = !this.model.active;
        if ( this.model.active )
            this.userActivated = 'Activated';
        else
            this.userActivated = 'Not Activated';
        this.modalService.open( content ).result
            .then(( result ) => {
                //this.onSubmit(this.model, true);
                console.log( 'OK' );
            },
            ( reason ) => {
                console.log( 'Dismissed' );
            }
            );
    }

    ngOnDestroy(): void {
        this.usrSubscription.unsubscribe();
    }
}
