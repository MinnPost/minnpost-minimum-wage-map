/**
 * Main application file for: minnpost-minimum-wage-map
 *
 * This pulls in all the parts
 * and creates the main object for the application.
 */
define('minnpost-minimum-wage-map', [
  'jquery', 'underscore', 'Ractive', 'helpers',
  'text!templates/application.mustache',
  'text!templates/loading.mustache'
],
  function($, _, Ractive, helpers, tApplication, tLoading) {

  // Constructor for app
  var App = function(options) {
    this.options = _.extend(this.defaultOptions, options);
    this.el = this.options.el;
    if (this.el) {
      this.$el = $(this.el);
    }
  };

  // Extend with custom methods
  _.extend(App.prototype, {
    // Start function
    start: function() {
      this.applictionView = new Ractive({
        el: this.$el,
        template: tApplication,
        data: {
          noData: true
        },
        partials: {
          loading: tLoading
        }
      });

    },

    // Default options
    defaultOptions: {
    }
  });

  return App;
});
