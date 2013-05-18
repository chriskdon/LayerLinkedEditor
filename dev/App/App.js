/**
 * Setup Require
 *
 * Create shims for external libraries
 */
require.config({
	paths: {
		'jQuery': 'vendors/jQuery.min'
	},

	shim: {
		'jQuery': {
			exports: '$'
		}
	},

	urlArgs: "bust=" + (new Date()).getTime()
});

// Run App
require(['DrawingEditor/DrawingEditor', 'DrawingEditor/kLayer'], function(DrawingEditor, kLayer) {
	var editor = new DrawingEditor("drawingArea", {
		width: 300,
		height: 300
	});

	// Add Layer
	$("#btn_AddLayer").click(function() {
		function updateCount() {
			$("#lbl_LayerCount").html(editor.getLayerCount());
		}

		var newLayer = new kLayer({
			backgroundColor: $("#txt_color").val(),
			opacity: $("#txt_opacity").val()
		});

		editor.addLayer(newLayer); // Add the new layer

		// Delete Layer
		$("#layerDeletes").append($("<input/>", {
			type: "button",
			value: "Delete Layer -> " + editor.getLayerCount()
		}).click(function() {
			//editor.removeLayer(newLayer);
			alert(newLayer.getImage64Data());
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