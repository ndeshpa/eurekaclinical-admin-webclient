import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { JobService } from '../../services/job.service';
import { Subscription } from 'rxjs/Rx';
import { Job } from '../../models/job';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-job-view',
    templateUrl: './job-view.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./job-view.component.css']
})

export class JobViewComponent implements OnInit, OnDestroy {
    displayedColumns = ['id', 'logInfo', 'sourceConfigId', 'destinationId', 'username', 'status'];
    dataSubscription: Subscription;
    public jobs: Job[] = [];
    dataSource: MatTableDataSource<Job>;
    jobId: any;
    errorMsg: string = '';
    data: any;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private adminService: AdminService, 
                private jobService: JobService, 
                private router: Router,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit() {        
        this.jobService.changeJobs(this.jobs);
        this.dataSource = new MatTableDataSource<Job>(this.jobs);
        this.dataSubscription = this.adminService.getAllJobs().subscribe(data => {
            this.data = data;
            for (var i = 0; i < this.data.length; i++) {
                this.jobs[i] = {
                    'id': this.data[i].id,
                    'logInfo': '',
                    'startTimestamp': this.data[i].startTimestamp,
                    'sourceConfigId': this.data[i].sourceConfigId,
                    'destinationId': this.data[i].destinationId,
                    'username': this.data[i].username,
                    'status': this.data[i].status,
                    'jobEvents': this.data[i].jobEvents,
                    'links': this.data[i].links,
                    'getStatisticsSupported': this.data[i].getStatisticsSupported,
                    'finishTimestamp': this.data[i].finishTimestamp
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

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
    
    ngOnDestroy(): void {
        if(this.dataSubscription !== null)
            this.dataSubscription.unsubscribe();
    }
}
