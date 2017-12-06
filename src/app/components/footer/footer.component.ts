import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
    inceptionYear: string = '2012';
    currentYear: string;
    organizationName: string = 'Emory University';
  constructor() { }

  ngOnInit() {
      this.currentYear = new Date().getFullYear().toString();
  }

}
