/**
 * Setup Require
 *
 * Create shims for external libraries
 */
require.config({
	paths: {
		'vendors.jQuery': 'vendors/jQuery.min',

		// Aplication Namespaces
		'App.DrawingEditor.DrawingEditor': 'DrawingEditor/DrawingEditor',
		'App.DrawingEditor.Layer': 'DrawingEditor/Layer',
		'App.DrawingEditor.Tools.Pencil': 'DrawingEditor/Tools/Pencil',

		'App.LayerDataManager.Manager': 'LayerDataManager/Manager'
	},

	shim: {
		'vendors.jQuery': {
			exports: '$'
		}
	},

	urlArgs: "bust=" + (new Date()).getTime()
});

// Run App
require(['App']);