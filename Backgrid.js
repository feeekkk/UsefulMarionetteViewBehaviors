/**
 * Created by Feek on 3/15/16.
 */
define([
	'marionette'
], function (
	Mn
) {
	var Backgrid = Mn.Behavior.extend({
		components: {
			collection	: null,
			grid		: null,
			paginator	: null,
			filter		: null
		},

		events: {
			'click @ui.submitSearch' : 'submitSearch'
		},

		ui: {
			search: '.search',
			submitSearch: '.submit-search',
			grid: '.grid',
			paginator: '.paginator',
			filter: '.filter'
		},

		onInitializeBackgridComponents(components) {
			this.components = components;
		},

		onRender: function() {
			this.components.collection.getFirstPage({reset: true}).done(function() {
				this.ui.paginator.html(this.components.paginator.render().el);
			}.bind(this));
			this.ui.search.html(this.components.filter.render().el);
			this.ui.grid.html(this.components.grid.render().el);
			this.ui.paginator.html(this.components.paginator.render().el);
		},

		submitSearch: function() {
			this.components.filter.search();
		}
	});

	return Backgrid;
});
