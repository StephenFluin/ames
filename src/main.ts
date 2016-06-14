import { bootstrapRender } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { environment } from './app/';



if (environment.production) {
  enableProdMode();
}

bootstrapRender('loader.js');

