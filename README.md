# Angular Community

This is an Angular project. It uses

* Angular CLI
* Internationalization
* AngularFire
* Material Design
* Latest version of Angular

## Setup

    npm install

## Run

    npm start


When you run the application, this will automatically

* Use the Angular CLI's `ng serve`

The CLI will watch for changes in your directory.

## Build

    ng build -prod

This will build the application and store the portable files in /dist/

## Build French Site

    ng build -prod --locale fr --i18n-file src/i18n/messages.fr.xlf
