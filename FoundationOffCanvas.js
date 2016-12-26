/**
 * Created by Feek on 3/15/16.
 */
define([
	'marionette',
	'foundationOffCanvas'
], function (
	Mn
) {
	var FoundationOffCanvas = Mn.Behavior.extend({
		$offCanvasWrap: null,

		defaults: {
			canvasOptions: null,
			disableScrollWhileOpen: true
		},

		/**
		 *
		 * @param options
		 */
		initialize: function(options) {
			this.view.on('openOffCanvas', this.onOpenOffCanvas.bind(this));
			this.view.on('closeOffCanvas', this.onCloseOffCanvas.bind(this));
			this.view.on('toggleOffCanvas', this.onToggleOffCanvas.bind(this));
		},

		onRender: function() {
			if (!this.$offCanvasWrap) {
				this._initializeOffCanvas();
			}
		},

		onOpenOffCanvas: function(evt) {
			this._ensureOffCanvasElement();

			this.$offCanvasWrap.foundation('open', evt, evt.trigger);
		},

		/**
		 * closes the off canvas
		 * @param bool cleanup, whether or not to empty the off canvas region
		 */
		onCloseOffCanvas: function(cleanup) {
			var view = this.view;

			this._ensureOffCanvasElement();

			this.$offCanvasWrap.foundation('close', function() {
				if (cleanup) {
					view.getRegion('offCanvas').empty();
				}
				view.trigger('offcanvas:closed');
			});
		},

		onToggleOffCanvas: function(evt) {
			this._ensureOffCanvasElement();
			this.$offCanvasWrap.foundation('toggle', evt);
		},

		_initializeOffCanvas: function() {
			this._ensureOffCanvasElement();
			var elem = new Foundation.OffCanvas(this.$offCanvasWrap, this.getOption('canvasOptions'));

			if (this.getOption('disableScrollWhileOpen')) {
				this.$offCanvasWrap.on('opened.zf.offcanvas', function () {
					$('#all-wrapper').css({
						'overflow': 'hidden',
						'height': '100vh'
					});
				});

				this.$offCanvasWrap.on('closed.zf.offcanvas', function () {
					$('#all-wrapper').css({
						'overflow': 'initial',
						'height': 'initial'
					});

					this.view.trigger('offcanvas:closed');
				}.bind(this));
			}
		},

		_ensureOffCanvasElement: function() {
			if (!this.$offCanvasWrap) {
				this.$offCanvasWrap = $('.off-canvas-wrapper');
			}
		}
	});

	return FoundationOffCanvas;
});
