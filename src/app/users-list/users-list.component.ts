import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

    users : User[] =[]; 

    constructor(
        private UserService: UserService,
        private AuthService: AuthService,
        private router: Router
    ) {
        if (!this.AuthService.isLoggedIn())
            this.router.navigateByUrl("/login");



        //have to check role to view this page;

        /* if (!this.AuthService.isLoggedIn())
         this.router.navigateByUrl("/login");
         */

        this.UserService.getAllUsers().subscribe((user) => {
            console.log(user);
            this.users = user ;
          
            console.log(this.users);
        });

    }

    ngOnInit() {
      
    }

    selectedUser?: User;
    onSelect(user: User): void {
        console.log("selected" + user.id);
        this.selectedUser = user;
        this.router.navigateByUrl("/edit-user/" + user.id);

    }

    addUser(){
        this.router.navigateByUrl("/add-user");
    }

}
