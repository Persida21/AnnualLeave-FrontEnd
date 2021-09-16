import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { AuthService } from '../login/auth.service';



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    applications : Application[] =[]; 

    constructor(
        private AuthService: AuthService,
        private router: Router,
        private ApplicationService : ApplicationService,
    
    ) {
          if (!this.AuthService.isLoggedIn())
            this.router.navigateByUrl("/login");


            const username  = this.AuthService.currentUserValue;
            console.log(username);

            this.ApplicationService.getApplicationsByUser(username.user).subscribe((apps) => {
                console.log(apps);
                this.applications = apps ;
              
                console.log(this.applications);
            });

            
        }

    ngOnInit() {
       
    }


    selectedApplication?: Application;
    onSelect(application: Application): void {
        console.log("selected" + application.id);
        this.selectedApplication = application;
        this.router.navigateByUrl("/edit-application/" + application.id);

    }

    addApplication(){
        this.router.navigateByUrl("/add-application");
    }


}
