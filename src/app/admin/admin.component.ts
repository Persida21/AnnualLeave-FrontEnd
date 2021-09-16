import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { ApplicationService } from '../application.service';
import { Application } from '../application';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


    applications: Application[] = [];

    constructor(
        private AuthService: AuthService,
        private router: Router,
        private ApplicationService: ApplicationService,
    ) {
        if (!this.AuthService.isLoggedIn())
            this.router.navigateByUrl("/login");


        const username = this.AuthService.currentUserValue.user;
        console.log(username);

        this.ApplicationService.getApplications().subscribe((apps) => {
            console.log(apps);
            this.applications = apps;

            console.log(this.applications);
        });

    }

    ngOnInit(): void {
    }

    getUsersList() {
        this.router.navigateByUrl("/users-list");
    }


    selectedApplication?: Application;
    onSelect(application: Application): void {
        console.log("selected" + application.id);
        this.selectedApplication = application;
        this.router.navigateByUrl("/edit-application/" + application.id);

    }

    accept(application: Application) {
        console.log("Accepted" + application.id);
        alert("Accepted" + application.id);
    }

    reject(application: Application) {
        alert("Rejected" + application.id);
    }
}
