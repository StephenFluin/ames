importScripts("https://code.angularjs.org/2.0.0-beta.17/angular2-polyfills.js",
  "https://code.angularjs.org/tools/system.js",
  "https://code.angularjs.org/tools/typescript.js",
  "system-config.js");

System.import("main-background")
  .then(
    function(m) {
      try {
        m.main();
      } catch (e) {
        console.error(e);
      }
    },
    function(error) { console.error("error loading background", error); });