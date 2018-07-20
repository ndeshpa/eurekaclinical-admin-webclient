import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs/Rx';
import { Job } from '../../models/job';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-job-view',
    templateUrl: './job-view.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./job-view.component.css']
})

export class JobViewComponent implements OnInit {
    displayedColumns = ['id', 'sourceConfigId', 'created', 'user', 'destination', 'name', 'finished'];
    subscription: Subscription;
    public jobs: Job[] = [];
    dataSource: MatTableDataSource<Job>;
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;
    public paging = true;
    errorMsg: string = '';
    data: any;
    constructor(private adminService: AdminService) { }

    ngOnInit() {
        this.jobs[0] = {'id':1, 'sourceConfigId':'Spreadsheet', 'created': new Date(), 
                        'user':1, 'destination':1, 'name':'Job1', 'finished': new Date()};
        this.jobs[1] = {'id':2, 'sourceConfigId':'Spreadsheet', 'created': new Date(), 
                        'user':1, 'destination':1, 'name':'Job1', 'finished': new Date()};
        this.dataSource = new MatTableDataSource<Job>(this.jobs);
        this.adminService.getAllJobs().subscribe(data => {
            this.data = data;
            for (var i = 0; i < this.data.length; i++) {
                this.jobs[i] = {
                    'id': this.data[i].id,
                    'sourceConfigId': this.data[i].sourceConfigId,
                    'created': this.data[i].created,
                    'user': this.data[i].user,
                    'destination': this.data[i].destination,
                    'name': this.data[i].name,
                    'finished': this.data[i].finished
                };
            }

        },
            error => {
                if (error instanceof HttpErrorResponse) {
                    this.errorMsg = 'Server Error: ' + error.message;
                }
                else {
                    this.errorMsg = 'Error Running Query, Please Retry';
                }
            },
            () => {
                console.log('SUCCESS in JOB');
            });
    }

    public changePage(page: any, data: Job[] = this.sortData()) {

        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return new MatTableDataSource<Job>(data.slice(start, end));
    }

    public onChangeTable(page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
        this.dataSource = page && this.paging ? this.changePage(page, this.sortData())
            : new MatTableDataSource<Job>(this.sortData());
    }

    sortData() {
        return this.jobs.sort((a, b) => {
            if (a.user < b.user) return -1;
            else if (a.user > b.user) return 1;
            else return 0;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
}
