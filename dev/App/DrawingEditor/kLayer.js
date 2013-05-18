/**
 * DrawingEditor/kLayer
 * 
 * Layer that can hold elements.
 */
define(['jQuery'], function($){
	function kLayer(options) {
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
	kLayer.prototype.getCanvas = function() {
		return this.canvas;
	};

	/**
	 * @return {Canvas Context} Get the context of the canvas for this layer.
	 */
	kLayer.prototype.getCanvasContext = function() {
		return this.getCanvas().get(0).getContext('2d');
	};

	/**
	 * @return {string} Get the name of this layer.
	 */
	kLayer.prototype.getName = function() {
		return this.options.name;
	};

	/**
	 * @return {string} The base64 representation of the canvas image.
	 */
	kLayer.prototype.getImage64Data = function() {
		return this.getCanvas().get(0).toDataURL();
	};

	return kLayer;
});