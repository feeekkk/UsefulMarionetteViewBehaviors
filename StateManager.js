/**
 * Created by Feek on 5/9/16.
 *
 * This behavior is meant for keeping track of what sub view to show in a process. For example, a checkout flow might
 * contain 4 different views, each meant to be shown sequentially. This behavior helps abstract out the logic pertaining
 * to which view to show
 *
 * child views should trigger 'show:next' on the parent view in order to progress to the next view seamlessly
 */

define([
	'marionette'
], function(
	Marionette
) {
	var stateManager = Marionette.Behavior.extend({
		currentIndex: -1, // which index of view flow is currently being shown (incremented to 0 on before show)
		viewFlow: [], // populated from view
		region: null, // populated from view

		initialize: function() {
			this.view.on('show:next', this.showNext.bind(this));
		},

		/**
		 * called from view in order to set the order of the views to show in progression
		 *
		 * IE:
		 * 	var viewsToShow = [
		 *		new UserInfoEntryView(),
		 *		new AddressEntryView(),
		 *		new BillingInfoEntryView(),
		 *		new OrderReviewView()
		 *	 ];
		 *
		 *	this.triggerMethod('setViewFlow', viewsToShow);
		 */
		onSetViewFlow: function(viewsToShow) {
			this.viewFlow = viewsToShow;
		},

		/**
		 * called from view in order to supply the region to show these views inside of
		 * @param region
		 */
		onSetRegion: function(region) {
			this.region = region;
		},

		onBeforeShow: function() {
			this.showNext();
		},

		_showCurrentView: function() {
			// we are preventing destroy here, so remember to clean up later
			this.region.show(this.viewFlow[this.currentIndex], {	preventDestroy:	true	});
		},

		/**
		 * Increments the current index and shows the next view
		 */
		showNext: function() {
			this.currentIndex++;
			this.view.trigger('before:showNext', this.currentIndex);
			this._showCurrentView();
			this.view.trigger('after:showNext', this.currentIndex);
		},

		/**
		 * Helper function to switch which index is being shown. Updates the active class
		 * @param index
		 */
		onGoToIndex: function(index) {
			this.currentIndex = index;
			this._showCurrentView();
		},

		/**
		 * clean up the view flow views we created since we prevented destroy previously
		 */
		onDestroy: function() {
			for (var index in this.viewFlow) {
				this.viewFlow[index].destroy();
			}
		}
	});

	return stateManager;
});
