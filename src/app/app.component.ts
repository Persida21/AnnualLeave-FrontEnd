import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/auth.service';
import { UserService } from '../app/user.service';
import { Observable, observable, from, Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentUser: any;
    constructor(
        private router: Router,
        private AuthService: AuthService,
    ) {


        this.AuthService.getUser.subscribe((x: any) => {
            this.currentUser = x; });
    }

    get isAdmin() {

        return this.currentUser && this.currentUser.role === "SUPERVISOR";

    }

    logout() {
        this.AuthService.logout();
        this.router.navigate(['/login']);
    }

}
