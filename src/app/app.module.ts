import { AppModule, enableProdMode, ApplicationRef } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AmesAppComponent } from './ames.component';
import { FORM_DIRECTIVES, FormsModule } from '@angular/forms';
import { ROUTER_DIRECTIVES, provideRouter } from '@angular/router';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import {  routes } from './routes';

@AppModule({
    // Add RouterModule
    modules: [BrowserModule, FormsModule, FormsModule],
    directives: [],
    pipes: [],
    providers: [
      provideRouter(routes),
      FIREBASE_PROVIDERS,
      defaultFirebase({
        apiKey: "AIzaSyCTOFGccvaEedz1Jykckni5T-WP7XixS_o",
        authDomain: "project-4800661445983438923.firebaseapp.com",
        databaseURL: "https://project-4800661445983438923.firebaseio.com/",
        storageBucket: "project-4800661445983438923.appspot.com",
      })
      
    ],
    precompile: [AmesAppComponent],  
  })
export class MyAppModule {
  constructor(private appRef : ApplicationRef) {
    appRef.bootstrap(AmesAppComponent);
  }
}