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

	editor.addLayer(new kLayer({
		backgroundColor: "#F00"
	}));

	editor.addLayer(new kLayer({
		backgroundColor: "#0F0",
		opacity: 0
	}));

	console.log("Drawing Surface Created => " + editor.toString());
});