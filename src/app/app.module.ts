import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { AngularFireModule } from "angularfire2";

import { RunsService } from "./services/runs.service";
import { AuthService } from "./services/auth.service";
import { UsersService } from "./services/users.services";
import { appRoutes } from "./app.routes";

import { HeaderComponent } from './header/header.component';
import { AdminRunsComponent } from './admin-runs/admin-runs.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from "./landing/landing.component";
import { PlacesComponent } from "./places/places.component";
import { RunCardComponent } from "./run-card/run-card.component";

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
        LandingComponent,
        HeaderComponent,
        PlacesComponent,
        AdminRunsComponent,
        FooterComponent,
        RunCardComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    providers: [RunsService, AuthService, UsersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
