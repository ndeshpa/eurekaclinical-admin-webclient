import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Job } from '../../models/job';
import { JobEvent } from '../../models/jobEvent';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-job-events',
  templateUrl: './job-events.component.html',
  styleUrls: ['./job-events.component.css']
})
export class JobEventsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  errorMsg: string = '';
  jobs: Array<Job> =  [];  
  jobId: number;
  jobEvents: Array<JobEvent> = [];
  dataSource: MatTableDataSource<JobEvent>;
  displayedColumns = ['id', 'status', 'exceptionStackTrace', 'timeStamp', 'message'];
  constructor( private jobService: JobService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   this.subscription = this.jobService.currentJobs.subscribe( jobs => this.jobs = jobs);
    this.activatedRoute.params.subscribe(params => {
        this.jobId = +params['id'];
    });
    
    for(var i=0; i<this.jobs.length; i++){
        var myJob = this.jobs[i];       
        if(this.jobId === myJob.id){
            this.jobEvents = myJob.jobEvents;          
            this.dataSource = new MatTableDataSource<JobEvent>(this.jobEvents);

        }
        
    }
  }
  
    backToJobs() {
        this.router.navigate(['/jobView']);
    }
    
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
    
    ngOnDestroy():void {
        if(this.subscription !== null)
            this.subscription.unsubscribe();
    }
}
