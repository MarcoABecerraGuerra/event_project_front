import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.backendService;

  constructor(private http: HttpClient) { }

  AccederLogin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario/login`, data).pipe(
      catchError(this.manejarError)
    );
  }

  private manejarError(error: HttpErrorResponse) {
    // Aquí puedes personalizar el manejo del error
    const errorMessage = error.error ? JSON.stringify({ message: error.error.message, result: error.error.result, data: error.error.data }) : JSON.stringify({message: 'Error desconocido'});
    return throwError(() => new Error(errorMessage)); // Lanzar un nuevo error
  }
}
