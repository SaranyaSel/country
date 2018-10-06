import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.css']
})
export class CountryInfoComponent implements OnInit {
  countryListInfo:any=[];
  constructor(public countryService: ApiService) { }

  ngOnInit() {
    this.getCountry();//initialise the list
  }
   getCountry(){
     //getting all country through services
     this.countryService.getCountries()
     .subscribe(
       (data)=>{
        if(data){
          // console.log(data);
          this.countryListInfo=data;
        }
       }
     ); 
   }
}
