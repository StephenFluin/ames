import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AmesAppComponent, environment } from './app/';

import { provideRouter } from 'vladivostok';
import { routes } from './app/routes';

if (environment.production) {
  enableProdMode();
}

bootstrap(AmesAppComponent, provideRouter(routes));

