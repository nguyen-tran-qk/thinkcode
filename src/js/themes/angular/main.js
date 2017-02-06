// Curriculum
require('../html/_curriculum');

// Scrolling behaviour
// require('../html/_scroll');

// Quiz timer
require('../html/_countdown');

// Earnings chart
require('../html/_flotchart-earnings');

// Angular App
require('./angular/app.js');
require('./angular/config.router.js');
require('./angular/demo.js');
require('./angular/utils.js');
require('./angular/main.js');

// Library Directives
require('essential/js/angular/main');
require('layout/js/angular/main');
require('sidebar/js/angular/main');
require('maps/js/angular/_google-maps');
require('media/js/angular/main');
require('material/js/angular/main');

// Custom Directives
require('./angular/directives/navbar-transition-scroll');
require('./angular/directives/countdown');
require('./angular/directives/curriculum');
require('./angular/directives/flotchart-earnings');
require('./angular/directives/material-treeview');
require('./angular/directives/treeView');

// Angular App Services
require('./angular/services/demo')