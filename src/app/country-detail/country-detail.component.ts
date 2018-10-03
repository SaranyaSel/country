import { Component, OnInit } from '@angular/core';
import { Country } from '../country';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  country:any;
  country_visit=[];
  constructor(private route:ActivatedRoute,
  private router:Router,
  private service:ApiService) { }

  ngOnInit() {
    let param=this.route.snapshot.paramMap.get('name');
    console.log(param);
    if(param){
      let name=param;
      this.getCountryDetails(name);
    }
  }
  getCountryDetails(name:string){
    this.service.getCountry(name).subscribe(
    (response)=>{
      console.log(name);
      // this.country_visit.push= name;
      this.country_visit = JSON.parse(localStorage.getItem('country_visit')) || [];
      console.log(this.country_visit);
      this.country_visit.push(name);
      console.log(this.country_visit);
      localStorage.setItem('country_visit', JSON.stringify(this.country_visit));
      console.log(response);
      this.country=response[0];
      console.log( this.country);
    }
    );

  }

}
