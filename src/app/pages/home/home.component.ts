import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { CaractersService } from '../../services/caracters.service';
import { CharacterDTO } from '../../dto/character.dto';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { SearchService } from '../../services/search.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CardComponent, CommonModule, HeaderComponent, InfiniteScrollDirective]
})
export class HomeComponent implements OnInit {
  public characters: CharacterDTO[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  listOfCharacters: CharacterDTO[] = [];
  hasMorePages: boolean = false;
  constructor(private charService: CaractersService, private searchService: SearchService) {
  }
  ngOnInit(): void {
    this.getCharacters();
    this.loadAllCharactersOnPage();

    this.searchService.search$.subscribe(query => {
      this.charService.searchCharactersByName(query).subscribe(data => {
        this.characters = data;
      });
    });
  }
  getCharacters() {
    this.charService.getCaracters(this.currentPage).subscribe((response: CharacterDTO[]) => {
      this.characters = response
    })
  }

  loadAllCharactersOnPage(): void {
    this.charService.getCaracters(this.currentPage)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            this.hasMorePages = false;
          }
          this.loading = false;
          return of([]);
        })
      )
      .subscribe((data: CharacterDTO[]) => {
        if (data.length > 0) {
          this.listOfCharacters = [...this.characters, ...data];
          this.characters = [...this.listOfCharacters];
        }
        this.loading = false;
      });
  }

  onScrollingScreen(): void {
    if (!this.loading) {
      this.currentPage++;
      this.loadAllCharactersOnPage();
    }
  }

}
