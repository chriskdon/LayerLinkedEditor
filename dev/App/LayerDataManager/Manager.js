define(function(require) {
	/* Includes */
	var $ = require('vendors.jQuery');

	function Manager(options) {
		/* Optional Parameters */
		this.options = $.extend({
			onLinkData: function(layer, data) {}
		}, options);

		this.data = []; /* Holds all the related data and layers in objects */
	}

	/**
	 * Link a drawing with some information related to that drawing.
	 * @param  {App.DrawingEditor.Layer} layer The layer to link to.
	 * @param  {Object} data  The data to link to the layer.
	 * @return {Object}       The combined data/layer object.
	 */
	Manager.prototype.linkLayerToData = function(layer, data) {
		var linked = {
			layer: layer,
			data: data
		};

		this.data.push(linked);

		if(this.options.onLinkData) this.options.onLinkData(layer, data);

		return linked;
	}; 
	

	return Manager;
});