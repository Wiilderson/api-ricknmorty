import { Component, Input } from '@angular/core';
import { CharacterDTO } from '../../dto/character.dto';
import { RouterLink } from '@angular/router';
import { EpisodeDTO } from '../../dto/episodes.dto';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../services/shared-data.service';

export type dataParameters = CharacterDTO | EpisodeDTO;
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() data?: any;

  constructor(private dataService: SharedDataService) {

  }
  ngOnInit(): void {
    console.log(this.data);
  }

  sendCharacterData(event: Event) {
    event.preventDefault();
    this.dataService.sendData('char');
  }
  sendEpisodeData(event: Event) {
    event.preventDefault();
    this.dataService.sendData('epi');
  }

  isCharacter(data: any): data is CharacterDTO {
    return data && data.status !== undefined;
  }

  isEpisode(data: any): data is EpisodeDTO {
    return data && data.air_date !== undefined;
  }
}
