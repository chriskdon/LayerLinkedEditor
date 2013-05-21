define(function(require) {
	var $ = require('vendors.jQuery');

	var private = {}; // Private functions for this class

	function Pencil(context, options) {
		this.options = $.extend({
			color: '#000'
		}, options);

		this.context = context; // Canvas context

		this.started = false;
	}

	/**
	 * Normalize the even so that all x, and y's work on every browser
	 * @param  {function} callback The normalized event.
	 */
	private.normalizedEvent = function(callback) {
		return function(event) {
			if (event.layerX || event.layerX === 0) { /* Firefox */
				event._x = event.layerX;
				event._y = event.layerY;
			} else if (event.offsetX || event.offsetX === 0) { /* Opera */
				event._x = event.offsetX;
				event._y = event.offsetY;
			}

			callback(event);
		};
	};

	/**
	 * Start drawing at a point.
	 * @return {function} Handler for the mouse down event.
	 */
	Pencil.prototype.getMouseDownEventHandler = function() {
		var tool = this;

		return private.normalizedEvent(function(event) {
			tool.context.beginPath();
			tool.context.moveTo(event._x, event._y);
			tool.started = true;
		});
	};

	/**
	 * Draw connected lines.
	 * @return {function} Handler for the mouse move event
	 */
	Pencil.prototype.getMouseMoveEventHandler = function() {
		var tool = this;

		return private.normalizedEvent(function(event) {
			if(tool.started) {
				tool.context.lineTo(event._x, event._y);
				tool.context.stroke();
			}
		});
	};

	/**
	 * Stop drawing
	 * @return {function} Handler for mouse up event
	 */
	Pencil.prototype.getMouseUpEventHandler = function() {
		var tool = this;

		return private.normalizedEvent(function(event) {
			if(tool.started) {
				tool.getMouseMoveEventHandler()(event);
				tool.started = false;
			}
		});
	};

	return Pencil;
});