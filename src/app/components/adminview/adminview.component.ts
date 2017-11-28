import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';


@Component( {
    selector: 'app-adminview',
    templateUrl: './adminview.component.html',
    styleUrls: ['./adminview.component.css'],
    encapsulation: ViewEncapsulation.None
} )
export class AdminviewComponent implements OnInit {
    model: AdminUser;
    public rows: Array<any> = [];
    public columns: Array<any> = [
        { title: 'Action', name: 'action', sort: false },
        { title: 'Username', name: 'username', filtering: { filterString: '', placeholder: 'Filter by username' } },
        { title: 'Name', name: 'fullName', filtering: { filterString: '', placeholder: 'Filter by fullName' } },
        { title: 'Last Login', name: 'lastLogin' },
        { title: 'Role', name: 'roles' },
        { title: 'Email', name: 'email', sort: false, filtering: { filterString: '', placeholder: 'Filter by email' } },
        { title: 'Organization', name: 'organization', sort: false },
        { title: 'Status', name: 'status', className: 'text-warning' },
        { title: 'Title', name: 'title' },
        { title: 'Department', name: 'department' }
    ];
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table-striped', 'table-bordered']
    };


    data: Array<any>;

    public constructor( private http: Http, private router: Router, private adminService: AdminService ) {
        this.getAllUsers();
    }

    ngOnInit() {
        this.onChangeTable( this.config );
    }

    public changePage( page: any, data: Array<any> = this.data ): Array<any> {
        let start = ( page.page - 1 ) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? ( start + page.itemsPerPage ) : data.length;
        return data.slice( start, end );
    }

    public changeSort( data: any, config: any ): any {
        if ( !config.sorting ) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;

        for ( let i = 0; i < columns.length; i++ ) {
            if ( columns[i].sort !== '' && columns[i].sort !== false ) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if ( !columnName ) {
            return data;
        }

        // simple sorting
        return data.sort(( previous: any, current: any ) => {
            if ( previous[columnName] > current[columnName] ) {
                return sort === 'desc' ? -1 : 1;
            } else if ( previous[columnName] < current[columnName] ) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        } );
    }

    public changeFilter( data: any, config: any ): any {
        let filteredData: Array<any> = data;
        this.columns.forEach(( column: any ) => {
            if ( column.filtering ) {
                filteredData = filteredData.filter(( item: any ) => {
                    return item[column.name].match( column.filtering.filterString );
                } );
            }
        } );

        if ( !config.filtering ) {
            return filteredData;
        }

        if ( config.filtering.columnName ) {
            return filteredData.filter(( item: any ) =>
                item[config.filtering.columnName].match( this.config.filtering.filterString ) );
        }

        let tempArray: Array<any> = [];
        filteredData.forEach(( item: any ) => {
            let flag = false;
            this.columns.forEach(( column: any ) => {
                if ( item[column.name].toString().match( this.config.filtering.filterString ) ) {
                    flag = true;
                }
            } );
            if ( flag ) {
                tempArray.push( item );
            }
        } );
        filteredData = tempArray;

        return filteredData;
    }

    public onChangeTable( config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage } ): any {
        if ( config.filtering ) {
            Object.assign( this.config.filtering, config.filtering );
        }

        if ( config.sorting ) {
            Object.assign( this.config.sorting, config.sorting );
        }

        let filteredData = this.changeFilter( this.data, this.config );
        let sortedData = this.changeSort( filteredData, this.config );
        this.rows = page && config.paging ? this.changePage( page, sortedData ) : sortedData;
        this.length = sortedData.length;
    }

    public onCellClick( data: any ): any {
        console.log( data );
    }

    private getAllUsers() {
        this.adminService.getAllUsers()
        .subscribe( data => {
            this.data = data;
            this.length = this.data.length;
            var dataArray = [];
            for ( var i = 0; i < data.length; i++ ) {
                dataArray = [];
                var role = '';
                for ( var j = 0; j < this.data[i].roles.length; j++ ) {
                    role += ( this.data[i].roles[j] === 1 ? 'Admin' : 'Researcher' );
                    if ( j < this.data[i].roles.length - 1 )
                        role += ',';
                }
                dataArray.push( {
                    'action': `<a href="/editUser/edit/` + this.data[i].id
                    + `"><span class="glyphicon glyphicon-pencil"></span></a>
                                          &nbsp;<a class="btn" href="#">
                                          <span class="glyphicon glyphicon-remove"></span></a>`,
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
                } );
                this.rows[i] = dataArray[0];
            }
        } );
    }
}
