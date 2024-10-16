import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = environment.backendService;

  constructor(private http: HttpClient) { }

  ObtenerLista(data: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/contratacion`, data).pipe(
      catchError(this.manejarError)
    );
  }

  Registrar(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contratacion`, data).pipe(
      catchError(this.manejarError)
    );
  }

  Actualizar(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/contratacion`, data).pipe(
      catchError(this.manejarError)
    );
  }

  Eliminar(data: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contratacion`, data).pipe(
      catchError(this.manejarError)
    );
  }

  private manejarError(error: HttpErrorResponse) {
    // Aquí puedes personalizar el manejo del error
    const errorMessage = error.error ? JSON.stringify({ message: error.error.message, result: error.error.result, data: error.error.data }) : JSON.stringify({message: 'Error desconocido'});
    return throwError(() => new Error(errorMessage)); // Lanzar un nuevo error
  }
}
