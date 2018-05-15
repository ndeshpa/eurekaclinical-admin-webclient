import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; 
import { MomentModule } from 'angular2-moment'; 


import { ConfigFileService } from './services/config-file.service';
import { AdminService } from './services/admin.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { environment } from '../environments/environment';
import { AllHttpInterceptor } from './interceptors/all-http-interceptor/all-http-interceptor.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [{
                  provide: HTTP_INTERCEPTORS,
                  useClass: AllHttpInterceptor,
                  multi: true
               },
               {provide: LocationStrategy, useClass: HashLocationStrategy},
              AdminService,
              ConfigFileService,
              { provide: APP_INITIALIZER, useFactory: (config: ConfigFileService) => () => config.load(), deps: [ConfigFileService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
