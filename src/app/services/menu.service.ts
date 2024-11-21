import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = environment.backendService;
  private menuOptions: any[] = [];
  constructor(private http: HttpClient) { }

  setMenuOptions(options: any[]): void {
    this.menuOptions = options;
  }

  getMenuOptions(): any[] {
    return this.menuOptions;
  }

  obtenerMenu(data: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/menu`, data).pipe(
      catchError(this.manejarError)
    );
  }

  private manejarError(error: HttpErrorResponse) {
    // Aquí puedes personalizar el manejo del error
    const errorMessage = error.error ? JSON.stringify({ message: error.error.message, result: error.error.result, data: error.error.data }) : JSON.stringify({message: 'Error desconocido'});
    return throwError(() => new Error(errorMessage)); // Lanzar un nuevo error
  }
}
