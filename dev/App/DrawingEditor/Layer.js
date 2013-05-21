/**
 * DrawingEditor/Layer
 * 
 * Layer that can hold elements.
 */
define(function(require) {
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

		// Events connected to this layer
		this.eventHandlers = {};
	}

	/**
	 * Add an event handler to the canvas
	 * @param  {string} eventName Name of th event.
	 * @param  {function} handler   Function to call when it occurs.
	 */
	Layer.prototype.addEventHandler = function(eventName, handler) {
		var canvas = this.getCanvas().get(0);
		canvas.addEventListener(eventName, handler, false);

		this.eventHandlers[eventName] = handler;
	};

	/**
	 * Remove an event from the canvas.
	 * @param  {string} eventName The name of the event to be removed.
	 */
	Layer.prototype.removeEventHandler = function(eventName) {
		var canvas = this.getCanvas().get(0);
		canvas.removeEventListener(eventName, this.eventHandlers[eventName], false);

		delete this.eventHandlers[eventName];
	};

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