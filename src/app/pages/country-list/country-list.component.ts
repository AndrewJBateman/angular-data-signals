import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService } from 'src/app/services/country-data.service';
import { CountryCardComponent } from './country-card/country-card.component';
import { RouterModule } from '@angular/router';
import { CountryDetailInterface } from 'src/app/interfaces/countries.interface';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, CountryCardComponent, RouterModule],
  templateUrl: './country-list.component.html',
})
export default class CountryListComponent {
  countryListService = inject(CountriesService);
  countryListData = this.countryListService.countryListData;
  searchText = signal<string>('');
  regionSelected = signal<string>('All');
  regions: string[] = [
    'All',
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  countriesFiltered = computed(() => {
    const listToFilter =
      this.regionSelected() === 'All'
        ? this.countryListData()
        : this.countryListData().filter(
            (cntry: CountryDetailInterface) =>
              cntry.region === this.regionSelected()
          );
    return listToFilter.filter((cntry: CountryDetailInterface) =>
      cntry.name.common.toLowerCase().includes(this.searchText().toLowerCase())
    );
  });

  onSelectRegion = (event: Event): void => {
    if (!(event.target instanceof HTMLInputElement)) return;
    const regionChosen = event?.target?.value;
    this.regionSelected.set(regionChosen);
  };

  onSearch = (text: string) => {
    this.searchText.set(text);
  };
}
