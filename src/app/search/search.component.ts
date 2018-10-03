import { Component, OnInit  } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Country } from '../country';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import  'rxjs/add/operator/debounceTime';
import  'rxjs/add/operator/distinctUntilChanged';
import  'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  country:Country[];
  searchForm:FormGroup;
  countryList:any=[];
  countryName:any=[];
  searchStyle:string;
  searchHistory:any=[];
  constructor(public countryService: ApiService) { }

  ngOnInit() {
    this.searchStyle='displaynone';
    this.initForm();
    this.searchHistory = JSON.parse(localStorage.getItem('country_visit'));
    this.getCountry();
  }
  private initForm(){
    let search='';
    this.searchForm=new FormGroup({
      'search':new FormControl(search, Validators.min(3))
    });
  }
  getCountry(){
    this.searchForm.controls['search'].valueChanges
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((search)=>this.countryService.getSearch(search))
    .subscribe(
      (response:any)=>{
        console.log(response);
        let len;
        if(this.searchForm.controls['search'].value.length>=3){
          this.searchStyle='displayblock';
          if(response && response.length){
            this.countryList=[];
            this.countryName=[];
            this.countryList=response;
            console.log(this.countryList);
            // this.countryList.forEach(function (value) {
            //   this.countryName=value.name;
            //   console.log(value.name);
            // });
            if(response.length>10){
              len=10;
            }
            else{
              len=response.length;
            }
          
            for(var i=0;i<len;i++){
              this.countryName[i]=this.countryList[i].name;
              console.log(this.countryName);
            }
          }
        }
        else{
          this.searchStyle='displaynone';
        }
        // foreach
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log('completed');
      }
    );
    
  }
}
