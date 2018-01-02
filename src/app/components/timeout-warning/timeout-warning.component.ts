import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AdminService } from "../../services/admin.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-timeout-warning',
  templateUrl: './timeout-warning.component.html',
  styleUrls: ['./timeout-warning.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimeoutWarningComponent implements OnInit, OnDestroy {
 

  currentUrl: any;
  timeoutSecs: any;
  timeoutFinalSecs: 120;
  timer: any;
  sessSubscription: Subscription;
  constructor(private adminService: AdminService, private router: Router,
          private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     setTimeout(() => {
         this.doTimeout();
     }, this.timeoutFinalSecs*1000);
  }
  
  doTimeout(){
      this.router.navigate(['/logout']);
  }
  
  resetSession(){
      if(this.timer !== null)
          clearTimeout(this.timer);
      localStorage.setItem('timeOut', 'false');
      this.getSessionProperties();
      this.router.navigateByUrl(localStorage.getItem('currUrl'));
  }
  
  getSessionProperties(){
      //get current time and save in localStorage
      this.sessSubscription = this.adminService.getSessionProperties().subscribe( data => {
          var sessTimeout = JSON.stringify( data );
          JSON.parse( sessTimeout, ( key, value ) => {
              localStorage.setItem(key,value);
          });
      });
  }
  
  ngOnDestroy(): void {

  }
  

}
