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
  @Input() typeOfCard: string = '';

  constructor(private dataService: SharedDataService) {

  }
  ngOnInit(): void {
  }

  sendData(event: Event, type: string) {
    event.preventDefault();
    this.dataService.sendData(type);
  }

  isTypeOfCard(type: string): boolean {
    switch (type) {
      case 'char':
        return this.typeOfCard === 'char';
      case 'loc':
        return this.typeOfCard === 'loc';
      case 'epi':
        return this.typeOfCard === 'epi';
      default:
        return false;
    }
  }
}
