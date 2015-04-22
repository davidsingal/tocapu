define([
  'backbone',
  'models/facade'
], function(Backbone, Model) {

  'use strict';

  var model = new Model();

  var Facade = {

    get: function(attribute) {
      if(model.has(attribute)) {
        return model.get(attribute);
      }
      return undefined;
    },

    set: function(attribute, value) {
      model.set(attribute, value);
    },

    unset: function(attribute) {
      if(model.has(attribute)) {
        model.unset(attribute);
      }
    },

    reset: function() {
      model = new Model();
    }

  };

  return Facade;

});
