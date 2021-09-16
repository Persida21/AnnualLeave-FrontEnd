import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { ApplicationService } from '../application.service';


@Component({
    selector: 'app-add-application',
    templateUrl: './add-application.component.html',
    styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit {

    constructor(
        private ApplicationService: ApplicationService,
        private AuthService: AuthService,
        private router: Router,
    ) {
        if (!this.AuthService.isLoggedIn())
            this.router.navigateByUrl("/login");
    }

    ngOnInit(): void {
    }

    onClickSubmit(data: any) {
        console.log("from data" + data);


        let startDt  = new Date(data.startDate).getTime();
        let endDt  = new Date(data.endDate).getTime();
        data.startDate = startDt ;
        data.endDate = endDt ;
        data.user = JSON.parse(this.AuthService.currentUserValue).user;
        this.ApplicationService.addApplication(JSON.stringify(data)).subscribe(
            answer => {
                console.log("u shtua");
                alert("Application Succesfully Added");
                this.router.navigateByUrl("/dashboard");
            }
        )
    }

}
