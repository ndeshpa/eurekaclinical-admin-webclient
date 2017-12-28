import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminService } from "../../services/admin.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timeout-warning',
  templateUrl: './timeout-warning.component.html',
  styleUrls: ['./timeout-warning.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimeoutWarningComponent implements OnInit {

  currentUrl: any;
  timeoutSecs: any;
  timer: any;
  constructor(private adminService: AdminService, private router: Router,
          private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     
  }
  
  doTimeout(){
      this.router.navigate(['/logout']);
  }
  
  resetSession(){
      if(this.timer !== null)
          clearTimeout(this.timer);
      localStorage.setItem('timeOut', 'false');
      this.router.navigateByUrl(localStorage.getItem('currUrl'));
  }
  
  

}
