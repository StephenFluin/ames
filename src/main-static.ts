import { platformBrowser } from '@angular/platform-browser';
import { MyAppModuleNgFactory } from './app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(MyAppModuleNgFactory);

// platform browser dynamic - runtime compilation (dynamic compilation in the browser)
// platform browser - static compilation (also used by platform-browser-dynamic) in browser
// platform server - run angular without DOM