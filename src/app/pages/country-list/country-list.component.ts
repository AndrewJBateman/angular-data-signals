import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService } from 'src/app/services/country-data.service';
import { CountryCardComponent } from './country-card/country-card.component';
import { RouterModule } from '@angular/router';
import { CountryDetailInterface } from 'src/app/interfaces/countries.interface';
import { SpinnerComponent } from 'src/app/common/spinner/spinner.component';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, CountryCardComponent, RouterModule, SpinnerComponent],
  templateUrl: './country-list.component.html',
})
export default class CountryListComponent {
  loading = false;
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

  onSelectRegion = (
    region: Event & {
      target: HTMLButtonElement;
    }
  ) => {
    const { target } = region;
    this.regionSelected.set(target.value);
  };

  onSearch = (text: string) => {
    this.searchText.set(text);
  };
}
