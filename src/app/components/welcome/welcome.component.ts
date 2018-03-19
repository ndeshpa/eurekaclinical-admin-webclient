import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminService } from "../../services/admin.service";

@Component( {
    selector: 'app-welcome',
    templateUrl: './welcome.component.html'
} )
export class WelcomeComponent implements OnInit {
    action: string = 'waiting';

    constructor(private activatedRoute: ActivatedRoute,
            private router: Router,
            private adminService: AdminService) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe( params => {
            this.action = params['action'];
        });
        if(this.action === 'loggedIn'){
            this.adminService.setLoggedIn(true);
            this.router.navigate['/adminview'];
        }   
        else{
            localStorage.setItem('sessionTimeout', '0');
        }
    }
}
