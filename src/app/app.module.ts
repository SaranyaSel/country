import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { CountryInfoComponent } from './country-info/country-info.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { RedirectComponent } from './search/redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryInfoComponent,
    SearchComponent,
    CountryDetailComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
