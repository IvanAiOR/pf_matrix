/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
//require('file-saverjs');
//require('tableexport');
// require('bootstrap-table');
// import  'fs';
require('jquery');
require('cleave.js');
require('table2excel');
require('vuejs-datepicker');
require('chart.js');
require('nouislider');
// import 'fast-csv';
// import 'tmp';
// import 'jszip';
// import 'archiver';
// import 'unzipper';
// require('core-js');
// require('regenerator-runtime');
// require('exceljs');
require('./bootstrap');
// require('startbootstrap-sb-admin-2');
require('./notify');
require('./notify-styles');
require('./matrix');
require('./reporte-general');
require('./menu/marca');
require('./menu/categoria');
require('./catalogo');
require('./menu/origen');
require('./menu/prioridad');
require('./menu/estatus_cm');
require('./menu/comentario');
require('./menu/nombre_origen');
require('./menu/trato_precio');
require('./usuarios');
require('./rol');
//require('./efecto-matrix');

require('./producto');
require('./producto_deleted');
require('./importarExcel');
window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('datepicker-inicio-oferta', require('./components/DatepickerInicioOfertaComponent.vue').default);
Vue.component('datepicker-fin-oferta', require('./components/DatepickerFinOfertaComponent.vue').default);
Vue.component('datepicker-inicio-oferta-editar', require('./components/DatepickerInicioOfertaEditarComponent.vue').default);
Vue.component('datepicker-fin-oferta-editar', require('./components/DatepickerFinOfertaEditarComponent.vue').default);
Vue.component('datepicker-personalizado', require('./components/Datepicker.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


const app = new Vue({
    el: '#app',

});
