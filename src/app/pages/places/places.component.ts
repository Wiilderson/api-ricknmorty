import { Component } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CardComponent } from '../../components/card/card.component';
import { SearchService } from '../../services/search.service';
import { PlacesService } from '../../services/places.service';
import { LocationDTO } from '../../dto/locations.dto';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [InfiniteScrollDirective, CardComponent, CommonModule],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss'
})
export class PlacesComponent {
  public locations: LocationDTO[] = [];
  public currentPage: number = 1;
  public typeOfCard: string = 'loc'
  public hasMorePages: boolean = false;
  public loading: boolean = false;
  public listOfLocations: any;

  constructor(private searchService: SearchService, private locationService: PlacesService) { }

  ngOnInit() {
    this.getLocations();
    this.loadAllLocationsOnPage();

    this.searchService.search$.subscribe(query => {
      this.locationService.searchLocationsByName(query).subscribe(data => {
        this.locations = data
        this.hasMorePages = true;
      });
    });
  }

  loadAllLocationsOnPage() {
    this.locationService.getLocations(this.currentPage)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            this.hasMorePages = false;
          }
          this.loading = false;
          return of([]);
        })
      )
      .subscribe((data: LocationDTO[]) => {
        if (data.length > 0) {
          this.listOfLocations = [...this.locations, ...data];
          this.locations = [...this.listOfLocations];
        }
        this.loading = false;
      });
  }

  getLocations() {
    this.locationService.getLocations(this.currentPage).subscribe((response: LocationDTO[]) => {
      this.locations = response;
    })
  }

  onScrollingScreen() {
    if (!this.loading) {
      this.currentPage++;
      this.loadAllLocationsOnPage();
    }
  }

}
