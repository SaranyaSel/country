import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Country } from '../country';


@Injectable()
export class ApiService {
  country:Country[];
  constructor(private http:HttpClient) { }

  getCountries():Observable<{'country':Country[]}>{
    const url='https://restcountries.eu/rest/v2/all';
    const httpObservable=this.http.get<{'country':Country[]}>(url);
    // console.log(httpObservable);
    return httpObservable;
  }
  getSearch(keyword){
    // console.log(keyword);
    if(keyword  ){
      console.log(keyword);
      const url='https://restcountries.eu/rest/v2/name/'+keyword;
      const httpObservable=this.http.get<{keyword:any}>(url);
      return httpObservable;
    }
    else{
      const url='https://restcountries.eu/rest/v2/all';
      const httpObservable=this.http.get(url);
      return httpObservable;
    }
    // console.log(httpObservable);
   
  }
  getCountry(code){
    console.log(code);
    const url='https://restcountries.eu/rest/v2/alpha?codes='+code;
    const httpObservable=this.http.get<{code:string}>(url);
    console.log(httpObservable);
    return httpObservable;
  }

}
