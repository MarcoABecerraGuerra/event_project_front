import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.backendService;

  constructor(private http: HttpClient) { }

  ObtenerEventosXMes(data: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/eventoxmes`, data).pipe(
      catchError(this.manejarError)
    );
  }

  private manejarError(error: HttpErrorResponse) {
    // Aquí puedes personalizar el manejo del error
    const errorMessage = error.error ? JSON.stringify({ message: error.error.message, result: error.error.result, data: error.error.data }) : JSON.stringify({message: 'Error desconocido'});
    return throwError(() => new Error(errorMessage)); // Lanzar un nuevo error
  }
}
