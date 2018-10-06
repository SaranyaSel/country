import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Country } from '../country';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import  'rxjs/add/operator/debounceTime';
import  'rxjs/add/operator/distinctUntilChanged';
import  'rxjs/add/operator/switchMap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

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
  errorMessage: string;
  modalRef: BsModalRef;
  @ViewChild('error404') error404: TemplateRef<any>;
  constructor(public countryService: ApiService,
    private router: Router, 
    private route: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {
    // console.log("oninit");
    this.initForm();
    this.searchStyle='displaynone';
    //retrieve from local storage
    this.searchHistory = JSON.parse(localStorage.getItem('country_name'));
    // console.log(JSON.parse(localStorage.getItem('country_name')));
    if(this.searchHistory){//check the search is true
      this.searchHistory=this.countryService.filterCountry(this.searchHistory);
      // console.log(this.searchHistory);
    }
    this.getCountry();
  }
  
  private initForm(){
    let search='';
    this.searchForm=new FormGroup({
      'search':new FormControl(search, Validators.min(3))
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getCountry(){
    this.searchForm.controls['search'].valueChanges
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((search)=>this.countryService.getSearch(search))
    .subscribe(
      (response:any)=>{
        // console.log(response);
        let len;
        if(this.searchForm.controls['search'].value.length>=3){
          this.searchStyle='displayblock';
          if(response && response.length){
            this.countryList=[];
            this.countryName=[];
            this.countryList=response;
            // console.log(this.countryList);
            //display only 10 in the list
            if(response.length>10){
              len=10;
            }
            else{
              len=response.length;
            }
            ///display list from 1 to max 10
            for(var i=0;i<len;i++){
              this.countryName[i]=this.countryList[i].name;
              // console.log(this.countryName);
            }
          }
        }
        else{
          this.searchStyle='displaynone';
        }
      },
      (error) => {
        //avoid 404 error on search
        // console.log(error);
        this.openModal(this.error404);
        this.searchForm.reset({ 'search':''});
        //this is to reload home page. many reference not working. so made some trick to reload.This will allow application to work properly.
        this.router.navigate(['/refresh'], { relativeTo: this.route });
      }
    ); 
  }
}
