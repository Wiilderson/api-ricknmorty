import { Component } from '@angular/core';
import { EpisodesService } from '../../services/episodes.service';
import { EpisodeDTO } from '../../dto/episodes.dto';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [InfiniteScrollDirective, CardComponent, CommonModule],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss'
})
export class EpisodesComponent {
  public allEpisodes: EpisodeDTO[] = [];
  currentPage: number = 1;
  loading: boolean = false;
  listOfEpisodes: EpisodeDTO[] = [];
  hasMorePages: boolean = true;
  public typeOfCard: string = 'epi'
  constructor(private episodeService: EpisodesService, private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.loadAllEpisodes();
    this.loadAllEpisodesOnPage();

    this.searchService.search$.subscribe(query => {
      this.episodeService.searchEpisodesByName(query).subscribe((data: EpisodeDTO[]) => {
        this.allEpisodes = data;
        console.log(this.allEpisodes);
        this.hasMorePages = true;
      });
    });
  }

  loadAllEpisodes() {
    this.episodeService.getAllEpisodes(this.currentPage).subscribe((response: EpisodeDTO[]) => {
      this.allEpisodes = response;
    })
  }

  loadAllEpisodesOnPage(): void {
    this.loading = true;
    this.episodeService.getAllEpisodes(this.currentPage)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            this.hasMorePages = false;
          }
          this.loading = false;
          return of([]);
        })
      )
      .subscribe((data: EpisodeDTO[]) => {
        if (data.length > 0) {
          this.listOfEpisodes = [...this.allEpisodes, ...data];
          this.allEpisodes = [...this.listOfEpisodes];
        }
        this.loading = false;
      });
  }

  onScrollingScreen(): void {
    if (!this.loading && this.hasMorePages) {
      this.currentPage++;
      this.loadAllEpisodesOnPage();
    }
  }
}
