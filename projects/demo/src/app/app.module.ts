import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrettyJsonModule } from '@talentia/angular2-prettyjson';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrettyJsonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
