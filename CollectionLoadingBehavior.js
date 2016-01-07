/**
 * Created by Feek on 1/5/16.
 *
 * Thanks to the code found here for inspiration! https://github.com/marionettejs/backbone.marionette/issues/2221
 */

define([
	'backbone',
	'marionette'
], function(
	Backbone,
	Marionette
) {
	var collectionLoadIndicator = Marionette.Behavior.extend({
		ui: {
			loading: '.loading-animation'
		},

		/**
		 * View needs to call triggerMethod("setCollection", collection) and pass the collection as the parameter
		 * before fetching so that we can listen to the correct events and act accordingly
		 * @param collection
		 */
		onSetCollection: function(collection) {
			this.listenTo(collection, "request", this.showLoadingElement);
			this.listenTo(collection, "sync", this.hideLoadingElement);
			this.listenTo(collection, "error", this.hideLoadingElement);
		},

		showLoadingElement: function () {
			this.view.startBuffering();
			this.view.destroyEmptyView();

			// substr to remove "." from ui value
			var html = '<div class="' + this.ui.loading.substr(1) + '"\>' +
				'\<img src="/img/loading.gif"/>' +
				'\</div>';
			this.$el.prepend(html);

			this.view.endBuffering();
		},

		hideLoadingElement: function (a, b) {
			// since we are subscribing to all error events on the collection, we only want to update the dom when
			// status is 200 (fetch was successful, but may be empty). We can ignore everything else I think
			if (b && b.status && b.status != 200) {
				console.error('An error happened that was not an empty backbone collection: ' + JSON.stringify(b, null, 4));
				return;
			}

			this.$el.find(this.ui.loading).slideUp();

			this.view.checkEmpty();
		}
	});

	return collectionLoadIndicator
});
