import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService } from 'src/app/services/country-data.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './country-detail.component.html'
})
export default class CountryDetailComponent implements OnInit {
  countryListService = inject(CountriesService);
  country = this.countryListService.selectedCountry;

  initialValue = () => {
    console.log('country: ', this.country);
  }

  @Input() id = '';
  ngOnInit(): void {
    this.countryListService.selectedCountryCode.set(this.id);
  }
}
