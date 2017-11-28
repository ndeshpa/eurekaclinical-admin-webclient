import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigFileService } from '../../services/config-file.service';
import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
    currUser: AdminUser;
    userArray: Array<AdminUser>;
    usersAsJson: any;
    
    data: any = null;

    constructor( private http: Http, 
                 private configService: ConfigFileService, 
                 private adminService:AdminService ) {
        console.log("inside constructor");
        //this.userArray = this.adminService.getUserArray();
        console.log("got userArray");
        this.usersAsJson = this.adminService.getUsersAsJson();
        console.log("got usersAsJson");
        console.log(this.usersAsJson);
        let env:string = configService.getEnv('env');
        console.log("env is:" + env);
        console.log(configService.getConfig('casLoginUrl'));
    }

    ngOnInit() {
    }
}

