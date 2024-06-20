import { Component } from '@angular/core';
import { CharacterDTO } from '../../dto/character.dto';
import { ActivatedRoute } from '@angular/router';
import { CaractersService } from '../../services/caracters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent {
  public character!: CharacterDTO;

  constructor(private route: ActivatedRoute, private charService: CaractersService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.charService.getDetailsById(id).subscribe((details: CharacterDTO) => {
        this.character = details
      })
    })
  }
}
