import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Country } from '../country';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.css']
})
export class CountryInfoComponent implements OnInit {
  countryListInfo:any=[];
  constructor(public countryService: ApiService) { }

  ngOnInit() {
    this.getCountry();
  }
   getCountry(){
     this.countryService.getCountries()
     .subscribe(
       (data)=>{
        if(data){
          console.log(data);
          this.countryListInfo=data;
        }
       }
     ); 
   }
}
