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
	}
});

// Run App
require(['DrawingEditor/DrawingEditor', 'DrawingEditor/kLayer'], function(DrawingEditor, kLayer) {
	var editor = new DrawingEditor("drawingArea", {
		width: 300,
		height: 300
	});

	function updateCount() {
		$("#lbl_LayerCount").html(editor.getLayerCount());
	}

	$("#btn_AddLayer").click(function() {
		var newLayer = new kLayer({
			backgroundColor: $("#txt_color").val(),
			opacity: $("#txt_opacity").val()
		});

		editor.addLayer(newLayer); // Add the new layer

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

	console.log("Drawing Surface Created => " + editor.toString());
});