import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
    
    columns = [
      { 
        name: "id",
        title: "id"
      }, 
      { 
        name: "title",
        title: "title"
      }];
    
    rows = [
      {
        id: '1',
        title: 'title test1'
      }, 
      {
        id: '2',
        title: 'title test2'
      }, 
      {
        id: '3',
        title: 'title test3'
      }];


    public config:any = {
            paging: true,
            sorting: {columns: this.columns},
            filtering: {filterString: ''},
            className: ['table-bordered']
          };
           


    data: any = null;
    myName: string = 'Nita';

    constructor( private http: Http ) {
        this.getMyUsers();
        console.log("after return from getting data");
    }

    ngOnInit() {
    }

    private getMyUsers() {
        console.log("inside getMyUsers");
        return this.http.get( '/eurekaclinical-user-webapp/proxy-resource/users' )
            .map(( response: Response ) => response.json() )
            .subscribe( data => {
                this.data = data;
                console.log("finished getusers, data is...");
                console.log( this.data );               
            });
    }
}
