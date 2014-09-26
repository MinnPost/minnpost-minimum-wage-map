/**
 * Main application file for: minnpost-minimum-wage-map
 *
 * This pulls in all the parts
 * and creates the main object for the application.
 */
define('minnpost-minimum-wage-map', [
  'jquery', 'underscore', 'helpers', 'd3', 'topojson', 'simple-map-d3',
  'text!templates/application.underscore',
  'text!templates/loading.underscore',
  'text!templates/tooltip.underscore',
  'text!../data/usa.topo.json'
],
  function($, _, helpers, d3, topojson, SimpleMapD3, tApplication, tLoading, tTooltip, dTopoJSON) {

  // Constructor for app
  var App = function(options) {
    this.options = _.extend(this.defaultOptions, options);
    this.el = this.options.el;
    if (this.el) {
      this.$el = $(this.el);
    }

    this.templateApplication = _.template(tApplication);
    this.templateLoading = _.template(tLoading);
    this.templateTooltip = _.template(tTooltip);
  };

  // Extend with custom methods
  _.extend(App.prototype, {
    // Start
    start: function() {
      // Basic app template
      this.$el.html(this.templateApplication({
        noData: true,
        loading: this.templateLoading({})
      }));
      this.$mapContainer = this.$el.find('.minimum-wage-map-container');

      // Handle data
      this.transformData();

      // Draw the map with simple map
      this.drawMap();

      // Done loading
      this.$el.find('.message-container').slideUp('fast');
    },

    // Default options
    defaultOptions: {
    },

    // Transform data coming in
    transformData: function() {
      this.data = this.data || {};
      this.data.usaTopo = JSON.parse(dTopoJSON);
      this.data.usaTopo = topojson.feature(this.data.usaTopo, this.data.usaTopo.objects.usa);
      this.data.smallStates = ['VT', 'NH', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD', 'DC'];
    },

    // Draw map
    drawMap: function() {
      var thisApp = this;

      this.map = new SimpleMapD3({
        container: '.minimum-wage-map-container',
        data: this.data.usaTopo,
        styles: {
          stroke: '#BABABA',
          'stroke-width': 1.1,
          'stroke-linejoin': 'round',
          fill: '#232323',
          opacity: 0.9
        },
        stylesHover: {
          'stroke-width': 2,
          opacity: 1
        },
        tooltipContent: function(data) {
          return thisApp.templateTooltip({ data: data });
        }
      });

      // Small states
      /*
      this.map.featureGroup
        .selectAll('path.smd-path')
        .data(this.map.data.features)
        .attr('data-small-state', function(d) {
          var thisFeature = this;
          var center, x, y;

          if (_.indexOf(thisApp.data.smallStates, d.id) !== -1) {
            center = thisApp.map.projPath.centroid(d);
            x = center[0] + 40;
            y = center[1];

            thisApp.map.canvas.append('line')
              .attr({
                x1: x + 20,
                y1: y + 20,
                x2: x,
                y2: y,
                stroke: 'blue',
                'stroke-width': 2
              });

            thisApp.map.canvas.append('text')
              .attr({
                x: x + 30,
                y: y + 25,
                stroke: 'lightblue'
              })
              .text(d.id);
          }
        });
      */
    }
  });

  return App;
});
