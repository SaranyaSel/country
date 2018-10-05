import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Country } from '../country';


@Injectable()
export class ApiService {
  country: Country[];
  constructor(private http: HttpClient) { }
  //get all countries
  getCountries(): Observable<{ 'country': Country[] }> {
    const url = 'https://restcountries.eu/rest/v2/all';
    const httpObservable = this.http.get<{ 'country': Country[] }>(url);
    // console.log(httpObservable);
    return httpObservable;
  }
  //search for the keyword
  getSearch(keyword) {
    // console.log(keyword);
    if (keyword) {
      console.log(keyword);
      const url = 'https://restcountries.eu/rest/v2/name/' + keyword;
      const httpObservable = this.http.get<{ keyword: any }>(url);
      return httpObservable;
    }
    else {
      const url = 'https://restcountries.eu/rest/v2/all';
      const httpObservable = this.http.get(url);
      return httpObservable;
    }
    // console.log(httpObservable);

  }
  //get country by code
  getCountryByCode(code) {
    console.log("bycode", code);
    const url = 'https://restcountries.eu/rest/v2/alpha?codes=' + code;
    const httpObservable = this.http.get<{ code: string }>(url);
    console.log("bycode", httpObservable);
    return httpObservable;
  }
  //get country by name
  getCountryByName(name) {
    console.log("byname", name);
    const url = 'https://restcountries.eu/rest/v2/name/' + name + '?fullText=true';
    const httpObservable = this.http.get<{ code: string }>(url);
    console.log("byname", httpObservable);
    return httpObservable;
  }
  //filter the country for single entry and store in reverse
  filterCountry(country) {
    let list = {};
    console.log(country.length);
    for (var i = country.length - 1; i >= 0; i--) {
      list[country[i]] = true;
      console.log(i, country[i]);
    }
    country = [];
    for (let name in list) {
      country.push(name);
      console.log(country);
    }
    return country;
  }
}
