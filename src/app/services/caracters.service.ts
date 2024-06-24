import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CharacterDTO } from '../dto/character.dto';

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

  getDetailsById(id: Number): Observable<CharacterDTO> {
    const urlID = `${this.API}${id}`;
    return this.http.get<CharacterDTO>(urlID);
  }

  searchCharactersByName(query: string): Observable<any> {
    const urlName = `${this.API}?name=${query}`;
    return this.http.get<any>(urlName).pipe(map((response) => response.results));
  }
}
