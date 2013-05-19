define(function(require) {
	/* Includes */
	var $ = require('vendors.jQuery');

	function Manager() {
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

		return linked;
	};

	return Manager;
});