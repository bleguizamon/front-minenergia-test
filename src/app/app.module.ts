import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PruebaService } from './services/prueba.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './util/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PruebaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
