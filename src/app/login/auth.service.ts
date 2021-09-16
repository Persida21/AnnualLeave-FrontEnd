import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    BASE_PATH = 'http://localhost:9191/api/';
    authenticated = false;
    private currentUserSubject: BehaviorSubject<String | null>;
    public getUser: Observable<String | null>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<String | null>( localStorage.getItem('currentUser'));
        this.getUser = this.currentUserSubject.asObservable();
    }

    USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

    userName: String = "";
    password: String = "";

    login(credentials: { userName: String; password: String; }) {
        console.log("ne login")
    
        return this.http.post<any>(this.BASE_PATH + 'login', credentials  )
            .pipe(map((user) => {
                console.log(user);
                // login successful if there's a jwt token in the response
                if (user.message == null) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem(
                        'token',
                        btoa(credentials.userName + ':' + credentials.password)
                    );
                    localStorage.setItem('currentUser', JSON.stringify(user));
                  
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }



    registerSuccessfulLogin(username: string, password: string) {
        sessionStorage.setItem(
            'token',
            btoa(username + ':' + password)
        );
    }

    logout() {
        sessionStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }


    isLoggedIn() {
        let user = sessionStorage.getItem('token');
        if (user === null) return false
        return true;
    }

    currentUser() {
        let token = sessionStorage.getItem("token");

        return new Promise((resolve, reject) => {
            this.http.get(this.BASE_PATH + 'user', { headers: { authorization: "Basic " + token } }).subscribe(response => {
                if (token !== null) {
                   
                    resolve(response);
                } else {
                    reject();
                }
            })

        });
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }


}
