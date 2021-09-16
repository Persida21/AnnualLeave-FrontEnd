import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { Role } from '../role';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


    model!: User;

    id: any;
    role!: Role;

    constructor(
        private UserService: UserService,
        private AuthService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {


        if (!this.AuthService.isLoggedIn())
            this.router.navigateByUrl("/login");



        //have to check role to view this page;

        /* if (!this.AuthService.isLoggedIn())
         this.router.navigateByUrl("/login");
         */



    }

    ngOnInit(): void {

        this.route.params.subscribe(params => {
            console.log(params) //log the entire params object
            this.id = params['id']//log the value of id
            this.UserService.getUser(this.id).subscribe((user) => {
                console.log(user);

                this.model = user;
                user.roles.forEach(role => {

                    this.role = role;
                    console.log(this.role);
                })
            });

        });


    }

    onClickSubmit(data: Object ) {
        console.log("from data" + data);
        
            this.UserService.updateUser(JSON.stringify(data)).subscribe(
                answer =>{
                    console.log("u be updte");
                    alert("User Succesfully Updated");
                    this.router.navigateByUrl("/users-list");
                }
            )
    }

    delete(userName : string){
        if (confirm("Do you want to delete user " + userName))
        {
            this.UserService.deleteUser(this.id).subscribe(()=>{
                console.log("u be updte");
                    alert("User Succesfully Deleted");
                    this.router.navigateByUrl("/users-list");
            })
        }
    }

}
