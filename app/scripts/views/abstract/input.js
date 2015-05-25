/*jshint bitwise:false*/
define([
  'underscore',
  'backbone',
  'views/abstract/base'
], function(_, Backbone, BaseView) {

  'use strict';

  var InputView = BaseView.extend({

    template: '<input value="{{{value}}}" />',

    events: {
      'blur': '_update'
    },

    /* Created in the initizalize method so it won't be part of the prototype
       and thus shared with all the instances */
    _model: {},

    /* Used for the validation of the model */
    validate: function() {},

    serialize: function() {
      if(this._model.isValid()) {
        return this._model.toJSON();
      }
      return _.extend(this._model.toJSON(), { error: this._model.validationError });
    },

    initialize: function(settings) {
      this.options = settings.options || {};
      this._model = new (Backbone.Model.extend())();
      this._model.validate = _.bind(this.validate, this);
      this._model.on('change:value', this.render, this);
    },

    get: function(property) {
      return this._model.get(property);
    },

    set: function(object) {
      this._model.set(object);
      return this._model.get(_.keys(object)[0]);
    },

    _update: function(e) {
      return this.set({ value: e.currentTarget.value });
    },

    isValid: function() {
      return this._model.isValid();
    }

  });

  return InputView;

});
