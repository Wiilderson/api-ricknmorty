import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EpisodeDTO } from '../dto/episodes.dto';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  private API = 'https://rickandmortyapi.com/api/episode/';

  constructor(private http: HttpClient) { }

  getAllEpisodes(page: number): Observable<EpisodeDTO[]> {
    const urlEpisodes = `${this.API}?page=${page}`;
    return this.http.get<any>(urlEpisodes).pipe(map((response) => response.results));
  }

  getDetailsEpisodeById(id: Number): Observable<EpisodeDTO> {
    const urlID = `${this.API}${id}`;
    return this.http.get<any>(urlID);
  }

  searchEpisodesByName(query: string): Observable<EpisodeDTO[]> {
    const urlName = `${this.API}?name=${query}`;
    return this.http.get<any>(urlName).pipe(map((response) => response.results));
  }
}
