/**
 * RequireJS config which maps out where files are and shims
 * any non-compliant libraries.
 */
require.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'Backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'Highcharts': {
      exports: 'Highcharts',
      deps: [ 'jquery']
    },
    'd3': {
      exports: 'd3'
    },
    'simple-map-d3': {
      exports: 'SimpleMapD3',
      deps: ['d3']
    }
  },
  baseUrl: 'js',
  paths: {
    'requirejs': '../bower_components/requirejs/require',
    'text': '../bower_components/text/text',
    'jquery': '../bower_components/jquery/jquery.min',
    'underscore': '../bower_components/underscore/underscore-min',
    'topojson': '../bower_components/topojson/topojson',
    'd3': '../bower_components/d3/d3',
    'simple-map-d3': '../bower_components/simple-map-d3/dist/simple-map-d3.src',
    'minnpost-minimum-wage-map': 'app'
  }
});
