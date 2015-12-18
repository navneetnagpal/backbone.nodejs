define(["require", "exports", "marionette"], function (require, exports, Marionette,AccountModel) {

	var AllAccounts={};
	AllAccounts.AccountView = Marionette.ItemView.extend({

		tagName: 'tr',

		template: '#template-accountsItemView',

		className: function () {
			return this.model.get('acType');
		},

		ui: {
			edit: '.edit',
			destroy: '.destroy',
			label: 'label',
			toggle: '.toggle'
		},
		initialize:function(){
			
		},
		events: {
			'click @ui.destroy': 'deleteModel',
			'dblclick @ui.label': 'onEditClick',
			'keydown @ui.edit': 'onEditKeypress',
			'focusout @ui.edit': 'onEditFocusout',
			'click @ui.toggle': 'toggle'
		},

		modelEvents: {
			change: 'render'
		},

		deleteModel: function () {
			this.model.destroy();
		},

		toggle: function () {
			this.model.toggle().save();
		}
	});
	// Item List View
	// --------------
	//
	// Controls the rendering of the list of items, including the
	// filtering of activs vs completed items for display.
	AllAccounts.ListView = Marionette.CompositeView.extend({

		template: '#template-accountsListCompositeView',

		childView: AllAccounts.AccountView,

		childViewContainer: '#accounts-list',

		ui: {
			toggle: '#toggle-all'
		},

		events: {
			'click @ui.toggle': 'onToggleAllClick'
		},
		collectionEvents: {
			'change': 'render'
		},

		initialize: function () {
			// this.listenTo(this.collection, 'change', this.render, this);
		},

		filter: function (child) {
			return child.matchesFilter();
		},

		setCheckAllState: function () {
			function reduceCompleted(left, right) {
				return left && right.get('closed');
			}
			var allCompleted = this.collection.reduce(reduceCompleted, true);
			this.ui.toggle.prop('checked', allCompleted);
			this.$el.parent().toggle(!!this.collection.length);
		},

		onToggleAllClick: function (e) {
			var isChecked = e.currentTarget.checked;

			this.collection.each(function (todo) {
				todo.save({ closed: isChecked });
			});
		}
	});
	return AllAccounts;
});