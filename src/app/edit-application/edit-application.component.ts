import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { AuthService } from '../login/auth.service';
import { DatePipe } from '@angular/common'


@Component({
    selector: 'app-edit-application',
    templateUrl: './edit-application.component.html',
    styleUrls: ['./edit-application.component.css']
})
export class EditApplicationComponent implements OnInit {

    model!: Application;
    id: any;

    constructor(
        private ApplicationService: ApplicationService,
        private AuthService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private datepipe: DatePipe
    ) {

        if (!this.AuthService.isLoggedIn())
            this.router.navigateByUrl("/login");

        this.route.params.subscribe(params => {
            console.log(params) //log the entire params object
            this.id = params['id']//log the value of id
            this.ApplicationService.getApplication(this.id).subscribe((app) => {

                this.model = app;
                this.model.startDt = this.datepipe.transform(new Date(app.startDate),'yyyy-MM-dd');
                this.model.endDt = this.datepipe.transform(new Date(app.endDate),'yyyy-MM-dd');
            });

        });

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
        data.id = this.id;

        this.ApplicationService.updateApplication(JSON.stringify(data)).subscribe(
            answer => {
                console.log("u be updte");
                alert("Application Succesfully Updated");
                this.router.navigateByUrl("/dashboard");
            }
        )
    }

    delete() {
        if (confirm("Do you want to delete Application? ")) {
            this.ApplicationService.deleteApplication(this.id).subscribe(() => {
                console.log("u be delete");
                alert("Application Succesfully Deleted");
                this.router.navigateByUrl("/dashboard");
            })
        }
    }

}
