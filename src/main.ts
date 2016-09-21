import './polyfills.ts';

import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MyAppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(MyAppModule);

// import { MyAppModuleNgFactory } from './ngfactory/app/app.module.ngfactory';
// import { platformBrowser } from '@angular/platform-browser';

// platformBrowser().bootstrapModuleFactory(MyAppModuleNgFactory);


