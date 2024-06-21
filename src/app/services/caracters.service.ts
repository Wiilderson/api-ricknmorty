import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaractersService {
  private API = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) { }

  getCaracters(page: number): Observable<any> {
    const url = `${this.API}?page=${page}`;
    return this.http.get<any>(url).pipe(map((response) => response.results));
  }

  getDetailsById(id: Number): Observable<any> {
    const urlID = `${this.API}${id}`;
    return this.http.get<any>(urlID);
  }

}
