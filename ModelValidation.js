/**
 * Created by Feek on 1/5/16.
 */
define([
	'marionette'
], function (
	Mn
) {
	var ModelValidation = Mn.Behavior.extend({

		/**
		 * This behavior cycles through a views modelsToValidate array of models and listens
		 * for an invalid event. When this happens, the behavior displays a list of error messages
		 * at the top of the view in an alert bar
		 *
		 * VIEW REQUIRES:
		 * - ui.alertArea (defaults to top of view)
		 * - modelsToValidate (defaults to views model)
		 *
		 * @param options
		 */
		initialize: function(options) {
		},

		onShow: function() {
			if (!this.view.modelsToValidate) {
				this.view.modelsToValidate = [this.view.model];
			}

			// models to validate should have been set in initialize of the view, so were good to set up listeners
			_.each(this.view.modelsToValidate, function(model) {
				this.listenTo(model, "invalid", this.validationError);
			}, this);
		},

		validationError: function(model, errors) {
			_.each(errors, function(error) {
				this.showError(error.message);
			}, this);
		},

		showError: function(message) {
			if (!this.view.ui.alertArea) {
				// insert alert area into the views $el and cache it into views ui as alertArea
				var html = '<div class="alert-area"></div>'
				this.view.$el.prepend(html);
				this.view.ui.alertArea = this.view.$el.find('.alert-area');
			}

			this.view.ui.alertArea.append('<div data-closable class="small alert callout text-center"> \
				<div class="message">' + message + '</div> \
				<button class="close-button" aria-label="Dismiss alert" type="button" data-close> \
					<span aria-hidden="true">&times;</span> \
				</button> \
			</div>');
		}
	});

	return ModelValidation;
});
