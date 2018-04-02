import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AdminService } from '../../services/admin.service';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { AdminUser } from '../../models/admin-user';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistryEntry } from "../../models/registry-entry";

/**
 * @title User Table with pagination
 */
@Component( {
    selector: 'app-adminview',
    templateUrl: './adminview.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./adminview.component.css']
} )
export class AdminviewComponent implements OnInit, OnDestroy {



    displayedColumns = ['action', 'username', 'fullName'];
    displayedMdColumns = ['action', 'username', 'fullName', 'lastLogin', 'roles'];
    errorMsg: string = '';
    userRoles: Role[] = [];
    finalDisplayedCols = [];
    selectCols = [
        { 'name': 'Username', 'value': 'username', 'checked': true },
        { 'name': 'Full Name', 'value': 'fullName', 'checked': true },
        { 'name': 'Last Login', 'value': 'lastLogin', 'checked': true },
        { 'name': 'Roles', 'value': 'roles', 'checked': true },
        { 'name': 'Email', 'value': 'email', 'checked': true },
        { 'name': 'Organization', 'value': 'organization', 'checked': true },
        { 'name': 'Status', 'value': 'status', 'checked': true },
        { 'name': 'Title', 'value': 'title', 'checked': true },
        { 'name': 'Department', 'value': 'department', 'checked': true }
    ];
    data: any;
    public unsortedData: User[] = [];
    dataSource: MatTableDataSource<User>;
    subscription: Subscription;
    roleSubscription: Subscription;
    //pagination
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;
    public paging = true;

    public constructor( private router: Router,
        private adminService: AdminService ) {
    }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<User>( this.unsortedData );
        //get roles
        this.getRoles();
        //get users
        this.getAllUsers();
    }
    
    public onChangeTable( page: any = { page: this.page, itemsPerPage: this.itemsPerPage } ): any {
        this.getselectedCols();
        this.dataSource = page && this.paging ? this.changePage( page, this.sortData() )
            : new MatTableDataSource<User>( this.sortData() );
    }

    public changePage( page: any, data: User[] = this.sortData() ) {
        let start = ( page.page - 1 ) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? ( start + page.itemsPerPage ) : data.length;
        return new MatTableDataSource<User>( data.slice( start, end ) );
    }

    private getAllUsers() {
        this.subscription = this.adminService.getAllUsers().subscribe( data => {
            this.data = data;
            this.length = this.data.length;
            for ( var i = 0; i < this.data.length; i++ ) {
                var role = '';
                for ( var j = 0; j < this.data[i].roles.length; j++ ) {
                    for ( var k = 0; k < this.userRoles.length; k++ ) {
                        if ( this.userRoles[k].id === this.data[i].roles[j] ) {
                            role += this.userRoles[k].name;
                        }
                    }
                    if ( j < this.data[i].roles.length - 1 )
                        role += ', ';
                }
                this.unsortedData[i] = {
                    'action': '',
                    'id': this.data[i].id,
                    'username': this.data[i].username,
                    'fullName': this.data[i].fullName,
                    'lastLogin': this.data[i].lastLogin,
                    'roles': role,
                    'email': this.data[i].email,
                    'organization': this.data[i].organization,
                    'status': ( this.data[i].active ? 'Active' : 'Inactive' ),
                    'title': this.data[i].title,
                    'department': this.data[i].department
                };
            }
            this.onChangeTable();
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
                console.log( 'SUCCESS in ADMINVIEW' );
            } );
    }



    ngOnDestroy(): void {
        if ( this.subscription !== null )
            this.subscription.unsubscribe();
        if ( this.roleSubscription !== null )
            this.roleSubscription.unsubscribe();
    }

    sortData() {
        return this.unsortedData.sort(( a, b ) => {
            if ( a.username < b.username ) return -1;
            else if ( a.username > b.username ) return 1;
            else return 0;
        } );
    }

    getselectedCols() {
        //pop unchecked cols from displayedColumns array
        this.finalDisplayedCols = [];
        this.finalDisplayedCols.push( 'action' );
        for ( var i = 0; i < this.selectCols.length; i++ ) {
            if ( this.selectCols[i].checked ) {
                this.finalDisplayedCols.push( this.selectCols[i].value );
            }
        }
    }

    applyFilter( filterValue: string ) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    getRoles() {
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
                console.log( 'SUCCESS in ADMINVIEW' );
            } );
    }
}
