/**
 * DrawingEditor/Layer
 * 
 * Layer that can hold elements.
 */
define(function(require){
	/* Includes */
	var $ = require('vendors.jQuery');

	function Layer(options) {
		this.options = $.extend({
			name: null,
			backgroundColor: "transparent",
			opacity: 1
		}, options);

		// Create the canvas
		this.canvas = $('<canvas/>').css({
			"background-color": this.options.backgroundColor,
			"opacity": this.options.opacity
		});
	}

	/**
	 * @return {jQuery Canvas} Return the canvas for this layer.
	 */
	Layer.prototype.getCanvas = function() {
		return this.canvas;
	};

	/**
	 * @return {Canvas Context} Get the context of the canvas for this layer.
	 */
	Layer.prototype.getCanvasContext = function() {
		return this.getCanvas().get(0).getContext('2d');
	};

	/**
	 * @return {string} Get the name of this layer.
	 */
	Layer.prototype.getName = function() {
		return this.options.name;
	};

	/**
	 * @return {string} The base64 representation of the canvas image.
	 */
	Layer.prototype.getImage64Data = function() {
		return this.getCanvas().get(0).toDataURL();
	};

	return Layer;
});