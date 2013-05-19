define(function(require) {
	/* Includes */
	var $ = require('vendors.jQuery');
	var Pencil = require('App.DrawingEditor.Tools.Pencil');

	function DrawingEditor(editorID, options) {
		// Root element that canvases will be attached to
		this.root = {
			id: editorID,
			jElement: $("#" + editorID)
		};

		// Alias for the stage element
		this.stage = {
			element: this.root.jElement,
			layers: []
		};

		// Object to hold properties for the current state of tools
		this.toolManager = {
			tool: null,
			toolOnLayer: null
		};

		// Optional Settings
		this.options = $.extend({
			width: 200,
			height: 200,
			borderStyle: 'solid',
			borderWidth: '1px',
			borderColor: '#000'
		}, options);

		// Init
		this.stage.element.css({
			'display': 'inline-block',
			'width': this.options.width,
			'height': this.options.height,
			'border-style': this.options.borderStyle,
			'border-width': this.options.borderWidth,
			'border-color': this.options.borderColor,
			"position": "relative"
		});
	}

	/**
	 * Add a layer to the current stage.
	 * @param  {DrawingEditor/kLayer} layer The layer to be added to the stage.
	 * @return {DrawingEditor/kLayer}       The layer that was added.
	 */
	DrawingEditor.prototype.addLayer = function(layer) {
		var canvas = layer.getCanvas();

		canvas.css({
			width: this.options.width,
			height: this.options.height,
			position: "absolute",
			left: 0,
			top: 0
		}).attr("width", this.options.width)
		.attr("height", this.options.height);

		this.stage.element.append(canvas);

		this.stage.layers.push(layer);

		return layer;
	};

	/**
	 * Remove a layer from the stage.
	 * @param  {DrawingEditor/kLayer} layer The layer to be deleted.
	 * @return {DrawingEditor/Klayer}       The layer that was removed.
	 */
	DrawingEditor.prototype.removeLayer = function(layer) {
		layer.getCanvas().remove(); // Remove canvas from DOM

		// Delete from layers
		var layers = this.stage.layers;
		layers.splice(layers.indexOf(layer), 1);

		return layer;
	};

	/**
	 * Give details on the object.
	 * @return {string} Details.
	 */
	DrawingEditor.prototype.toString = function() {
		return "Drawing Editor @ElementID: #" + this.root.id + ", @Size: " +
			this.options.width + "x" + this.options.height;
	};

	/**
	 * @return {int} Return the number of layers created.
	 */
	DrawingEditor.prototype.getLayerCount = function() {
		return this.stage.layers.length;
	};

	/**
	 * @return {string} base64 image of the stage.
	 */
	DrawingEditor.prototype.getImage64Data = function() {
		var exportCanvas = $("<canvas/>")
							.attr("width", this.options.width)
							.attr("height", this.options.height).get(0);

		var exportContext = exportCanvas.getContext('2d');

		for(var i = 0; i < this.getLayerCount(); i++) {
			exportContext.drawImage(this.stage.layers[i].getCanvas().get(0), 0, 0);
		}

		return exportCanvas.toDataURL();
	};

	/**
	 * Move the pencil from one layer to another.
	 * @param  {/DrawingEditor/kLayer} layer Layer to move the pencil to.
	 * @param  {object}	Pencil options
	 * @return {/DrawingEditor/kLayer} Layer the pencil was moved to.
	 */
	DrawingEditor.prototype.putPencilOnLayer = function(layer, options) {
		// The tool to use
		var pencil = new Pencil(layer.getCanvasContext(),options);

		this.toolManager = {
			tool: pencil,
			toolOnLayer: layer
		};

		/**
		 * Normalize the even so that all x, and y's work on every browser
		 * @param  {function} type The event handler for this event.
		 */
		function normalizeEvent (type) {
			return function(event) {
				if (event.layerX || event.layerX === 0) { /* Firefox */
					event._x = event.layerX;
					event._y = event.layerY;
				} else if (event.offsetX || event.offsetX === 0) { /* Opera */
					event._x = event.offsetX;
					event._y = event.offsetY;
				}

				type(event);
			};
		}

		// Add events to the layers canvas
		var canvas = layer.getCanvas().get(0);
		canvas.addEventListener('mousedown', normalizeEvent(pencil.getMouseDownEventHandler()), false);
		canvas.addEventListener('mousemove', normalizeEvent(pencil.getMouseMoveEventHandler()), false);
		canvas.addEventListener('mouseup', normalizeEvent(pencil.getMouseUpEventHandler()), false);

		return layer;
	};

	return DrawingEditor;
});