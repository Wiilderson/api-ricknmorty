import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { PlacesComponent } from './pages/places/places.component';

export const routes: Routes = [
    { 'path': '', component: HomeComponent },
    { 'path': 'details/:id', component: CardDetailsComponent },
    { 'path': 'episodes', component: EpisodesComponent },
    { 'path': 'places', component: PlacesComponent }
];
