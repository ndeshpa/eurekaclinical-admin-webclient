import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component( {
    selector: 'app-welcome',
    templateUrl: './welcome.component.html'
} )
export class WelcomeComponent implements OnInit {
    action: string = 'waiting';

    constructor(private activatedRoute: ActivatedRoute,
            private router: Router) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe( params => {
            this.action = params['action'];
        });
        if(this.action === 'loggedIn'){
            localStorage.setItem( 'loggedIn', 'true' );
            this.router.navigate['/adminview'];
        }
            
    }
}
