import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { environment } from './app/';
import { MyAppModuleNgFactory } from './app/app.module.ngfactory';


platformBrowser().bootstrapModuleFactory(MyAppModuleNgFactory);