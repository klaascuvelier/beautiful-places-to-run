import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from "angularfire2";

import { RunsService } from "./services/runs.service";
import { AuthService } from "./services/auth.service";

import { HeaderComponent } from './header/header.component';
import { RunsOverviewComponent } from './runs-overview/runs-overview.component';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBZiYltRI85CCWMNVVJTm3nIRqjqeAZuXs",
  authDomain: "beautiful-places-to-run.firebaseapp.com",
  databaseURL: "https://beautiful-places-to-run.firebaseio.com",
  storageBucket: "beautiful-places-to-run.appspot.com",
  messagingSenderId: "863357431381"
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RunsOverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [RunsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
