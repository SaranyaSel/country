import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { Country } from '../country';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  country:any;
  country_visit={};
  country_name=[];
  country_code=[];
  cflag:string;
  cname:string;
  ccode:string;
  ccurrency:string;
  carea:number;
  cltld:any;
  modalRef: BsModalRef;
  @ViewChild('error404Name') error404Name: TemplateRef<any>;
  @ViewChild('error404Code') error404Code: TemplateRef<any>;
  constructor(private route:ActivatedRoute,
  private router:Router,
  private service:ApiService,
  private modalService: BsModalService) {}

  ngOnInit() {
    //get the url name with param
    let param=this.route.snapshot.paramMap.get('name');
    // console.log(param);
    let name=param;
    if(param && param.length==3){//select based on the code on click from texthead
      this.getCountryDetailsByCode(name);
    }
    else{//select from search history
      this.getCountryDetailsByName(name);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getCountryDetailsByCode(code:string){
    this.service.getCountryByCode(code).subscribe(
    (response)=>{
      // console.log(code);
      // // this.country_visit.push= name;
      console.log(response);
      //store the response
      if(response && response[0] !== null ){
        this.country=response[0];
        this.cname=this.country.name;
        this.cflag=this.country.flag;
        this.ccode=this.country.alpha3Code;
        this.ccurrency=this.country.currencies[0].code;
        this.carea=this.country.area;
        this.cltld=this.country.latlng;
        // console.log( this.country);
        this.country_name = JSON.parse(localStorage.getItem('country_name')) || [];
        this.country_code = JSON.parse(localStorage.getItem('country_code')) || [];
        this.country_name.push(this.country.name);
        this.country_code.push(this.country.alpha3Code);
        localStorage.setItem('country_name', JSON.stringify(this.country_name));
        localStorage.setItem('country_code', JSON.stringify(this.country_code));
      }
      else{
        this.openModal(this.error404Code);
        this.router.navigate(['/home'], { relativeTo: this.route });
      }
    },
    (error) => {
      console.log(error);
      this.openModal(this.error404Code);
      this.router.navigate(['/home'], { relativeTo: this.route });
    }
    );

  }
  getCountryDetailsByName(name:string){
    this.service.getCountryByName(name).subscribe(
    (response)=>{
      // console.log('byname');
      // console.log(name);
      // console.log(response);
      //store the response
      if(response && response[0] !== null ){
        this.country=response[0];
        this.cname=this.country.name;
        this.cflag=this.country.flag;
        this.ccode=this.country.alpha3Code;
        this.ccurrency=this.country.currencies[0].code;
        this.carea=this.country.area;
        this.cltld=this.country.latlng;
        this.country_name = JSON.parse(localStorage.getItem('country_name')) || [];
        this.country_code = JSON.parse(localStorage.getItem('country_code')) || [];
        this.country_name.push(this.country.name);
        this.country_code.push(this.country.alpha3Code);
        localStorage.setItem('country_name', JSON.stringify(this.country_name));
        localStorage.setItem('country_code', JSON.stringify(this.country_code));
      }
      else{
        this.openModal(this.error404Code);
        this.router.navigate(['/home'], { relativeTo: this.route });
      }
    },
    (error) => {
      console.log(error);
      this.openModal(this.error404Name);
      this.router.navigate(['/home'], { relativeTo: this.route });
    }
    );

  }
  onBack(): void {
    this.router.navigate(['/home']);
  }

}
