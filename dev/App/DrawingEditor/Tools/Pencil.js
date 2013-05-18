define(['jQuery'], function($) {
	function Pencil(context, options) {
		this.options = $.extend({
			color: '#000'
		}, options);

		this.context = context; // Canvas context

		this.started = false;
	}

	/**
	 * Start drawing at a point.
	 * @return {function} Handler for the mouse down event.
	 */
	Pencil.prototype.getMouseDownEventHandler = function() {
		var tool = this;

		return function(event) {
			tool.context.beginPath();
			tool.context.moveTo(event._x, event._y);
			tool.started = true;
		};
	};

	/**
	 * Draw connected lines.
	 * @return {function} Handler for the mouse move event
	 */
	Pencil.prototype.getMouseMoveEventHandler = function() {
		var tool = this;

		return function(event) {
			if(tool.started) {
				tool.context.lineTo(event._x, event._y);
				tool.context.stroke();
			}
		};
	};

	/**
	 * Stop drawing
	 * @return {function} Handler for mouse up event
	 */
	Pencil.prototype.getMouseUpEventHandler = function() {
		var tool = this;

		return function(event) {
			if(tool.started) {
				tool.getMouseMoveEventHandler()(event);
				tool.started = false;
			}
		};
	};

	return Pencil;
});