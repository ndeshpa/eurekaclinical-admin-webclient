import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule, URLSearchParams } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { map } from 'rxjs/operators';

import { ConfigFileService } from './services/config-file.service';
import { AdminService } from './services/admin.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { AdminviewComponent } from './components/adminview/adminview.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';


const appRoutes: Routes = [
       {path:'login', component:LoginComponent},
       {path:'register', component:RegisterComponent},
       {path:'welcome', component:WelcomeComponent},
       {path:'adminview', component:AdminviewComponent},
       {path:'admin', component:AdminComponent},
       {path:'editUser/:action/:id', component:EditUserComponent},
       {path: '', redirectTo: '/welcome', pathMatch: 'full'},
       {path: '**', component: PageNotFoundComponent }
      ];
        

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    RegisterComponent,
    PageNotFoundComponent,
    NavigationBarComponent,
    WelcomeComponent,
    EqualValidatorDirective,
    AdminviewComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule, 
    JsonpModule,
    Ng2SmartTableModule,
    Ng2TableModule,
    CollapseModule,
    FormsModule,
    PaginationModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes ,
            { enableTracing: true })
  ],
  providers: [
              AdminService, 
              ConfigFileService,
              { provide: APP_INITIALIZER, useFactory: (config: ConfigFileService) => () => config.load(), deps: [ConfigFileService], multi: true }
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
