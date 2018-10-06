import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryInfoComponent } from './country-info/country-info.component';
import { SearchComponent } from './search/search.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { RedirectComponent } from './search/redirect.component';

const routes: Routes = [
  { path:'', redirectTo:'/home',pathMatch:'full'},
  { path:'home',component: SearchComponent },
  { path:'country',component: CountryInfoComponent },
  { path:'country-detail/:name',component: CountryDetailComponent },
  { path:'refresh',component: RedirectComponent },
  { path:'**', redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //onSameUrlNavigation: 'ignore',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
