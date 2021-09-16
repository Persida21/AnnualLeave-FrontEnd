import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private BASE_PATH = 'http://localhost:9191/api/';
    constructor(private http: HttpClient) { }

    getUserRole(userName: String) {

        return new Promise((resolve, reject) => {
            this.http.post(this.BASE_PATH + 'getRole', userName, { responseType: 'text' })
                .subscribe((response) => {
                    if (response) {
                        resolve(response);
                    }
                    else reject();

                });
        })

    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>("http://localhost:9191/user/getUsers")
            .pipe(
                catchError(this.handleError<User[]>('getAllUsers', []))
            );
    }

    // GET User by id

    getUser(id: number): Observable<User> {
        const url = 'http://localhost:9191/user/getUser/' + id;
        return this.http.get<User>(url).pipe(
            catchError(this.handleError<User>(`getUser id=${id}`))
        );
    }

    // DELETE User by id

    deleteUser(id: number): Observable<any> {
        const url = 'http://localhost:9191/user/delete/' + id;
        return this.http.get(url , {responseType : 'text'});
    }

    updateUser(data: String): Observable<User> {
        const url = 'http://localhost:9191/user/updateUser/';
        return this.http.put<User>(url, data);
    }

    addUser(data: String): Observable<User> {
        const url = 'http://localhost:9191/user/addUser';
        return this.http.post<User>(url, data);
    }



    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}

