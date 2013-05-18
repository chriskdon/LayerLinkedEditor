/**
 * DrawingEditor/Layer
 * 
 * Layer that can hold elements.
 */
define(['jQuery'], function($){
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
	 * @return {Canvas} Return the canvas for this layer.
	 */
	Layer.prototype.getCanvas = function() {
		return this.canvas;
	};

	/**
	 * @return {string} Get the name of this layer.
	 */
	Layer.prototype.getName = function() {
		return this.options.name;
	};

	return Layer;
});