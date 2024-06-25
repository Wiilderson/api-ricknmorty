import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { LocationDTO } from '../dto/locations.dto';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private API = 'https://rickandmortyapi.com/api/location/';

  constructor(private http: HttpClient) { }

  getLocations(page: number): Observable<LocationDTO[]> {
    const urlLocation = `${this.API}?page=${page}`;
    return this.http.get<any>(urlLocation).pipe(map((response) => response.results));
  }

  getDetailsLocationById(id: Number): Observable<LocationDTO> {
    const urlLocationID = `${this.API}${id}`;
    return this.http.get<LocationDTO>(urlLocationID);
  }

  searchLocationsByName(query: string): Observable<LocationDTO[]> {
    const urlLocationName = `${this.API}?name=${query}`;
    return this.http.get<any>(urlLocationName).pipe(map((response) => response.results), catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): Observable<LocationDTO[]> {
    if (error.status === 404) {
      console.error('Locations not found:', error.message);
      return of([]);
    } else {
      return throwError(error);
    }
  }
}
