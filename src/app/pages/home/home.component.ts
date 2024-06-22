import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { CaractersService } from '../../services/caracters.service';
import { CharacterDTO } from '../../dto/character.dto';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { SearchService } from '../../services/search.service';

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
    console.log('testando')
    this.loading = true;
    this.charService
      .getCaracters(this.currentPage)
      .subscribe((data: CharacterDTO[]) => {
        this.listOfCharacters = [...this.characters, ...data];
        this.characters = [...this.listOfCharacters];
        this.loading = false;
        //this.listOfCharacters = [...this.listOfCharacters, ...data];
        //this.applyFilter();
      });
  }

  onScrollingScreen(): void {
    if (!this.loading) {
      this.currentPage++;
      this.loadAllCharactersOnPage();
    }
  }

  // applyFilter(): void {
  //   let filtered = [...this.characters];
  //   this.characters = filtered;
  // }


}
