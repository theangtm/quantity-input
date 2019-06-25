// require('./assets/js/*.js');
// require('./assets/ts/*.ts');

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./assets/js/', true, /\.js$/));
requireAll(require.context('./assets/ts/', true, /\.ts$/));

import style from "./assets/_scss/main.scss";
