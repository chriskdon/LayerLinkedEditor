define(function(require) {
	/* Includes */
	var $             = require('vendors.jQuery');
	var DrawingEditor = require('App.DrawingEditor.DrawingEditor');
	var Layer         = require('App.DrawingEditor.Layer');
	var Manager       = require('App.LayerDataManager.Manager');

	var editor = new DrawingEditor("drawingArea", {
		width: 300,
		height: 300
	});

	editor.putPencilOnLayer(editor.addLayer(new Layer())); // Starting Layer

	var manager = new Manager();

	// Add Layer
	$("#btn_AddLayer").click(function() {
		function updateCount() {
			$("#lbl_LayerCount").html(editor.getLayerCount());
		}

		var newLayer = new Layer({
			backgroundColor: $("#txt_color").val(),
			opacity: $("#txt_opacity").val()
		});

		editor.addLayer(newLayer);			// Add the new layer
		editor.putPencilOnLayer(newLayer);	// Draw on layer

		// Delete Layer
		$("#layerDeletes").append($("<input/>", {
			type: "button",
			value: "Delete Layer -> " + editor.getLayerCount()
		}).click(function() {
			editor.removeLayer(newLayer);
			updateCount();
			$(this).remove();
		}));

		updateCount();
	});

	// Export All
	$("#btn_ExporAll").click(function() {
		$("#exportOut").text(editor.getImage64Data());
	});

	console.log("Drawing Surface Created => " + editor.toString());
});