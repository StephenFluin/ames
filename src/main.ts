import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MyAppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(MyAppModule);

// platform browser dynamic - jit compilation (dynamic compilation in the browser)
// platform browser - ahead of time compilation (also used by platform-browser-dynamic) in browser
// platform server - run angular without DOM