import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { retry, shareReplay } from 'rxjs';
import { CountryDetailInterface } from '../interfaces/countries.interface';

const apiURL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private readonly httpClient: HttpClient) {}
  private countryData$ = this.httpClient
    .get<CountryDetailInterface[]>(`${apiURL}/all`)
    .pipe(
      shareReplay(1), retry(3));

  countryListData = toSignal(this.countryData$, { initialValue: [] });
  selectedCountryCode = signal<string>('');
  selectedCountry = computed(() => {
    return this.countryListData().find(
      ({ cca2 }) => cca2 === this.selectedCountryCode()
    );
  });
}
