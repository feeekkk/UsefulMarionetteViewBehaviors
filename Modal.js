/**
 * Created by Feek on 3/15/16.
 */
define([
	'marionette'
], function (
	Mn
) {
	var Modal = Mn.Behavior.extend({

		/**
		 * This behavior handles the behavior for a modal
		 *
		 * Ideally this would be refactored to alter the render method to include the background and close elements,
		 * but for now they are living inside the rootview within the modal region
		 *
		 * @param options
		 */
		initialize: function(options) {
			this.modalRegionSelector = options.modalRegionSelector || '.modal-region';
			_.bindAll(this, 'close');
		},

		events: {
			'click @ui.close' : 'close',
			'click @ui.cancel' : 'close'
		},

		ui: {
			close : '.close',
			cancel: '.cancel'
		},

		onShow: function() {
			$('body').css({
				'overflow' : 'hidden',
				'height' : '100vh'
			});
			this.$modalRegion = $(this.modalRegionSelector);
			this.$modalRegion.on('click', '.background', this.close); // bind to click on background outside of this views el
			this.$modalRegion.on('click', '.close', this.close); // bind to click on close outside of this views el
			this.$modalRegion.show(); // display: block
		},

		close: function() {
			this.$modalRegion.hide(); // display: none
			this.view.destroy();
			$('body').css({
				'overflow' : 'initial',
				'height' : 'initial'
			});
		},

		onBeforeDestroy: function() {
			// clean up events bound outside of this views el
			this.$modalRegion.off('click', '.background', this.close);
			this.$modalRegion.off('click', '.close', this.close);
		}
	});

	return Modal;
});
