import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';
import { AppComponent } from '../app.component';
import { UnaryOperator } from '@angular/compiler';


@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    credentials = { userName: '', password: '' };


    constructor(private route: ActivatedRoute,
        private router: Router,
        private AuthService: AuthService,
        private userService: UserService,
        private appComponent: AppComponent
    ) {
        if (this.AuthService.isLoggedIn()) {
            console.log("para ksaj t adminit")
            let user: String | null = localStorage.getItem('currentUser');
            if (user?.valueOf() !== undefined) {
                let x: any | null = JSON.parse(user?.valueOf());
                if (x.role === "SUPERVISOR") this.router.navigateByUrl("/admin");
                else this.router.navigateByUrl("/dashboard");
            }


        }
    }

    ngOnInit() {

    }

    handleLogin() {

        this.AuthService.login(this.credentials)
            .pipe(first())
            .subscribe(answer => {
                if (answer.message ==  null) {
                    console.log("isnide login");
                    this.userService.getUserRole(this.credentials.userName).then((val: any) => {
                        this.canActivate(this.credentials.userName, val)
                    })
                }
                else alert(answer.message);

            })

        return false;

    }

    canActivate(user: String, role: String) {
        // check if route is restricted by role
        if (role === "SUPERVISOR")
            this.router.navigateByUrl('/admin');
        else this.router.navigateByUrl('/dashboard');


    }

}