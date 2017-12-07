import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatIcon } from '@angular/material';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';
import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';

/**
 * @title Table with pagination
 */
@Component( {
    selector: 'app-adminview',
    templateUrl: './adminview.component.html',
    styleUrls: ['./adminview.component.css']
} )
export class AdminviewComponent implements OnInit, OnDestroy {



    displayedColumns = ['action', 'username', 'fullName', 'lastLogin', 'roles', 'email', 'organization', 'status', 'title', 'department'];
    data: Array<any>;
    public unsortedData: MyUser[] = [];
    dataSource = new MatTableDataSource<MyUser>( this.unsortedData );
    subscription: Subscription;
    //pagination
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;
    public paging = true;

    public constructor( private http: Http,
        private router: Router,
        private adminService: AdminService ) {
    }

    ngOnInit(): void {
        if ( this.router.url.endsWith( 'logout' ) ) {
            this.doLogout();
        }
        this.dataSource = new MatTableDataSource<MyUser>( this.unsortedData );
        this.data = new Array<any>();
        this.unsortedData = [];
        //pagination
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.paging = true;
        //get users
        this.getAllUsers();
    }


    public onChangeTable( page: any = { page: this.page, itemsPerPage: this.itemsPerPage } ): any {
        this.dataSource = page && this.paging ? this.changePage( page, this.sortData() )
            : new MatTableDataSource<MyUser>( this.sortData() );
    }

    public changePage( page: any, data: MyUser[] = this.sortData()) {
        let start = ( page.page - 1 ) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? ( start + page.itemsPerPage ) : data.length;
        return new MatTableDataSource<MyUser>( data.slice( start, end ) );
    }

    private getAllUsers() {
        this.subscription = this.adminService.getAllUsers().subscribe( data => {
            this.data = data;
            this.length = this.data.length;
            for ( var i = 0; i < data.length; i++ ) {
                var role = '';
                for ( var j = 0; j < this.data[i].roles.length; j++ ) {
                    role += ( this.data[i].roles[j] === 1 ? 'Admin' : 'Researcher' );
                    if ( j < this.data[i].roles.length - 1 )
                        role += ',';
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
        } );
    }

    doLogout() {
        this.adminService.doLogout();
        this.router.navigate( ['/welcome', 'loggedOut'] );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    sortData() {
        return this.unsortedData.sort(( a, b ) => {
            if ( a.username < b.username ) return -1;
            else if ( a.username > b.username ) return 1;
            else return 0;
        } );
    }
}

export interface MyUser {
    action: string;
    id: number;
    username: string;
    fullName: string;
    lastLogin: Date;
    roles: any;
    email: string;
    organization: string;
    status: string;
    title: string;
    department: string;
}

