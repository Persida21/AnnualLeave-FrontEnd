import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private UserService: UserService,
    private AuthService: AuthService,
    private router: Router,   
 
  ) {
    if (!this.AuthService.isLoggedIn())
    this.router.navigateByUrl("/login");
   }

  ngOnInit(): void {
  }

  onClickSubmit(data: Object ) {
    console.log("from data" );
    
        this.UserService.addUser(JSON.stringify(data)).subscribe(
            answer =>{
                console.log("u shtua");
                alert("User Succesfully Added");
                this.router.navigateByUrl("/users-list");
            }
        )
}


}
