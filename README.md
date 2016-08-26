# Angular 2 Project

This is an Angular 2 project. It uses

* Ahead of Time Compilation
* Angular CLI (SystemJS)
* Internationalization
* AngularFire
* Material Design
* Angular 2 from the master branch

## Setup

    npm install

## Run

    npm start


When you run the application, this will automatically

* Compile styles `.scss` -> `.css`
* Compile Angular Templates using `ngc`
* Use the Angular CLI's `ng serve`

The CLI will watch for changes in your directory, but it won't re-compile templates or CSS. To see changes, you'll need to run `npm start` again.

## Ahead of Time / Just in Time
This application defaults to AOT mode, but can be put into JIT mode to make development easier.

To make this work, you need to update the symlink `src/system-config.ts` to point to `system-config.aot.ts` or `system-config.jit.ts`.

To switch to AOT:

    rm src/system-config.ts ; ln -s system-config.aot.ts src/system-config.ts

To switch to JIT:

    rm src/system-config.ts ; ln -s system-config.jit.ts src/system-config.ts

To run while using JIT, use `ng serve` instead of `npm start` to skip the un-needed compilation steps.
