import { Component } from '@angular/core';
import { CharacterDTO } from '../../dto/character.dto';
import { ActivatedRoute } from '@angular/router';
import { CaractersService } from '../../services/caracters.service';
import { CommonModule } from '@angular/common';
import { EpisodesService } from '../../services/episodes.service';
import { EpisodeDTO } from '../../dto/episodes.dto';
import { SharedDataService } from '../../services/shared-data.service';
import { PlacesService } from '../../services/places.service';
import { LocationDTO } from '../../dto/locations.dto';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent {
  public character: CharacterDTO = new CharacterDTO;
  public episodes: EpisodeDTO = new EpisodeDTO;
  public locationDetails: LocationDTO = new LocationDTO;
  public dataDetails!: any;
  public typeDataShared: string = '';
  public char: boolean = false;
  public epi: boolean = false;
  public loc: boolean = false;

  constructor(private route: ActivatedRoute, private charService: CaractersService, private epiService: EpisodesService, private dataShared: SharedDataService, private locationService: PlacesService) { }

  ngOnInit(): void {
    this.dataShared.condition$.subscribe(condition => {
      if (condition === "char") {
        this.char = !this.char
        this.epi = false;
        this.loc = false;
        this.characterParamsByID();
      }
      if (condition === "epi") {
        this.epi = !this.epi
        this.char = false;
        this.loc = false;
        this.episodesParamsByID();
      }
      if (condition === "loc") {
        this.loc = !this.loc;
        this.epi = false
        this.char = false;
        this.locationParamsByID();
      }
    });

  }

  characterParamsByID() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.charService.getDetailsById(id).subscribe((details: CharacterDTO) => {
        this.character = details
      })
    })
  }

  episodesParamsByID() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.epiService.getDetailsEpisodeById(id).subscribe((details: EpisodeDTO) => {
        this.dataDetails = details
      })
    })
  }

  locationParamsByID() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.locationService.getDetailsLocationById(id).subscribe((details: LocationDTO) => {
        this.locationDetails = details
      })
    })
  }
}