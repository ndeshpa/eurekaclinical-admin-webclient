import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PaginationModule } from "ngx-bootstrap/pagination";
import { CollapseModule } from 'ngx-bootstrap';
import { map } from 'rxjs/operators';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { ResponsiveModule } from 'ngx-responsive';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';


import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AdminviewComponent } from './components/adminview/adminview.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserAgreementComponent } from './components/useragreement/useragreement.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { JobViewComponent } from './components/job-view/job-view.component';
import { JobEventsComponent } from './components/job-events/job-events.component';



const appRoutes: Routes = [
    { path: 'welcome/:action', component: WelcomeComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'adminview/result', component: AdminviewComponent },
    { path: 'adminview', component: AdminviewComponent },
    { path: 'useragreement', component: UserAgreementComponent },
    { path: 'logout', component: AdminviewComponent },
    { path: 'editUser/me/:action/:id', component: EditUserComponent },
    { path: 'editUser/:action/:id', component: EditUserComponent },
    { path: 'createUser', component: CreateUserComponent },
    { path: 'jobView', component: JobViewComponent },
    { path: 'jobEvents/:id', component: JobEventsComponent }, 
    { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];


@NgModule( {
    imports: [      
        FormsModule,
        LMarkdownEditorModule,
        CollapseModule,
        NoopAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        ResponsiveModule,
        PaginationModule.forRoot(),
        RouterModule.forRoot( appRoutes, { useHash: true } )
    ],
    declarations: [
        NavigationBarComponent,
        WelcomeComponent,
        AdminviewComponent,
        EditUserComponent,
        UserAgreementComponent,
        CreateUserComponent,
    	JobViewComponent,
        JobEventsComponent
    ],
    exports: [
        RouterModule
    ]
} )
export class AppRoutingModule { }
