import { Inject, Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { Job } from '../models/job';

@Injectable()
export class JobService {
    private jobs:any;
    
    public currentJobs;
    
    constructor(){
        this.jobs = new BehaviorSubject([]);
        this.currentJobs = this.jobs.asObservable()
    }
    
    changeJobs(myJobs:any) {
        this.jobs.next(myJobs)
    }
}