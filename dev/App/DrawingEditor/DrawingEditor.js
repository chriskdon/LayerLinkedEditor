define(['jQuery'], function($) {
	function DrawingEditor(editorID, options) {
		// Root element that canvases will be attached to
		this.root = {
			id: editorID,
			jElement: $("#" + editorID)
		};

		this.stage = this.root.jElement;

		// Optional Settings
		this.options = $.extend({
			width: 200,
			height: 200,
			borderStyle: 'solid',
			borderWidth: '1px',
			borderColor: '#000'
		}, options);

		// Init
		this.root.jElement.css({
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
		});

		this.stage.append(canvas);

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

	return DrawingEditor;
});