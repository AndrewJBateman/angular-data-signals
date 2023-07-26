import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CountryDetailInterface } from 'src/app/interfaces/countries.interface';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './country-card.component.html',
})
export class CountryCardComponent {
  @Input({ required: true }) country!: CountryDetailInterface;
}
