let packages = {
  app: {
    main: './main.js',
    defaultExtension: 'js'
  },
  rxjs: {
    defaultExtension: 'js'
  },
  angularfire2: {
    defaultExtension: 'js',
    main: 'angularfire2.js'
  }
}

// put the names of any of your Material components here
const materialPkgs:string[] = [
  'core',
  'toolbar',
  'button',
  'input',
  'card',
  'slide-toggle',
];
materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {
    main: `${pkg}.umd.js`
  };
});


System.config({
  paths: {
    'npm:': 'vendor/'
  },
  map: {
    'main': './main.js',

    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',


    '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
    '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
    '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
    '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',

    'rxjs': 'npm:rxjs',

    '@angular2-material': 'vendor/@angular2-material',
    'firebase': 'vendor/firebase/firebase.js',
    'angularfire2': 'vendor/angularfire2',
  },
  //packages defines our app package
  packages: packages
});

