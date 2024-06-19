import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaractersServiceService {
  private API = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) { }

  getCaracters(page: number = 1): Observable<any> {
    const url = `${this.API}?page=${page}`;
    return this.http.get<any>(url).pipe(map((response) => response.result));
  }

}
