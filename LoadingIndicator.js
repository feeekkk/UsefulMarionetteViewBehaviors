/**
 * Created by Feek on 1/5/16.
 *
 * Thanks to the code found here for inspiration! https://github.com/marionettejs/backbone.marionette/issues/2221
 *
 * If nprogress is set to true, then NProgress will be used to show loading. Otherwise an element with img src /img/loading.gif will be inserted into the DOM.
 */

define([
	'backbone',
	'marionette',
	'nprogress'
], function(
	Backbone,
	Marionette,
	NProgress
) {
	var loadIndicator = Marionette.Behavior.extend({
		ui: {
			loading: '.loading-animation'
		},

		defaults: {
			'nprogress' : true
		},

		/**
		 * View needs to call triggerMethod("setListener", model) and pass the backbone object to listen to as the parameter
		 * before fetching so that we can listen to the correct events and act accordingly.
		 * @param object backbone model or collection
		 */
		onSetListener: function(object) {
			this.listenTo(object, "request", this.showLoadingIndicator);
			this.listenTo(object, "sync", this.hideLoadingIndicator);
			this.listenTo(object, "error", this.hideLoadingIndicator);
		},

		showLoadingIndicator: function() {
			if (this.getOption('nprogress')) {
				NProgress.start();
				return;
			}

			this._showLoadingElement();
		},

		hideLoadingIndicator: function(a, b) {
			// since we are subscribing to all error events to stop the loading indiciator, we want to make sure the error is displayed in the console
			if (b && b.status && b.status != 200) {
				console.error('An error happened that was not an empty backbone collection: ' + JSON.stringify(b, null, 4));
			}

			if (this.getOption('nprogress')) {
				NProgress.done();
				return;
			}

			this._hideLoadingElement();
		},

		onDelete: function() {
			NProgress.remove();
		},

		_showLoadingElement: function () {
			this.view.startBuffering();
			this.view.destroyEmptyView();

			// substr to remove "." from ui value
			var html = '<div class="' + this.ui.loading.substr(1) + '"\>' +
				'\<img src="/img/loading.gif"/>' +
				'\</div>';
			this.$el.prepend(html);

			this.view.endBuffering();
		},

		_hideLoadingElement: function (a, b) {
			this.$el.find(this.ui.loading).slideUp();

			this.view.checkEmpty();
		}

	});

	return loadIndicator
});
