define(["require", "exports", "marionette"], function (require, exports, Marionette) {
	// var filterChannel = Backbone.Radio.channel('filter');

	var FooterLayout = Marionette.ItemView.extend({
		template: '#template-footer',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		ui: {
			filters: '#filters a',
			completed: '.completed a',
			active: '.active a',
			all: '.all a',
			summary: '#todo-count',
			clear: '#clear-completed'
		},

		events: {
			'click @ui.clear': 'onClearClick'
		},

		collectionEvents: {
			all: 'render'
		},

		templateHelpers: {
			activeCountLabel: function () {
				return (this.activeCount === 1 ? 'Account' : 'Accounts') + ' found';
			}
		},

		initialize: function () {
			// this.listenTo(filterChannel.request('filterState'), 'change:filter', this.updateFilterSelection, this);
		},

		serializeData: function () {
			var savings = this.collection.getSavings().length;
			var total = this.collection.length;

			return {
				savingsCount: savings,
				totalCount: total,
				othersCount: total - savings
			};
		},

		onRender: function () {
			this.$el.parent().toggle(this.collection.length > 0);
			this.updateFilterSelection();
		},

		updateFilterSelection: function () {
			this.ui.filters.removeClass('selected');
			// this.ui[filterChannel.request('filterState').get('filter')].addClass('selected');
		},

		onClearClick: function () {
			var completed = this.collection.getCompleted();
			completed.forEach(function (todo) {
				todo.destroy();
			});
		}
	});
	return FooterLayout;
});