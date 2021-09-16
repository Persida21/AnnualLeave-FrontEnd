import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Application } from './application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

    private BASE_PATH = 'http://localhost:9191/application/';
    constructor(private http: HttpClient) { }


    getApplicationsByUser(userId : String): Observable<Application[]> {
        return this.http.post<Application[]>( this.BASE_PATH +"getApplicationsByUser/" , userId )
            .pipe(
                catchError(this.handleError<Application[]>('getApplicationsByUser', []))
            );
    }

    // GET Application by id

    getApplication(id: number): Observable<Application> {
        const url =  this.BASE_PATH + 'getApplication/' + id;
        return this.http.get<Application>(url).pipe(
            catchError(this.handleError<Application>(`getApplication id=${id}`))
        );
    }

     // GET Applications

     getApplications(): Observable<Application[]> {
        const url =  this.BASE_PATH + 'getApplications';
        return this.http.get<Application[]>(url).pipe(
            catchError(this.handleError<Application[]>(`getApplications`))
        );
    }

    // DELETE Application by id

    deleteApplication(id: number): Observable<any> {
        const url = this.BASE_PATH + 'delete/' + id;
        return this.http.get(url , {responseType : 'text'});
    }

    updateApplication(data: String): Observable<Application> {
        const url = this.BASE_PATH + 'updateApplication/';
        return this.http.put<Application>(url, data);
    }

    addApplication(data: String): Observable<Application> {
        const url =  this.BASE_PATH + 'addApplication';
        return this.http.post<Application>(url, data);
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
