
define(["require", "exports", "marionette", "app", "js/layouts/HeaderLayout", "js/layouts/FooterLayout",
	"components/allAccounts/account", "components/allAccounts/allAccounts"], function (require, exports, Marionette, App, HeaderLayout, FooterLayout, AccountModel, AllAccounts) {
		var filterChannel = Backbone.Radio.channel('filter');
		var Controller = Backbone.Marionette.Object.extend({

			initialize: function () {
				this.accountList = new AccountModel.AccountList();
			},

			// Start the app by showing the appropriate views
			// and fetching the list of todo items, if there are any
			start: function () {
				this.header = this.getHeader(this.accountList);
				this.footer = this.getFooter(this.accountList);
				this.content = this.getContent(this.accountList);
			},
			getHeader: function (accountList) {
				var header = new HeaderLayout({
					collection: accountList
				});
				return header;
			},
			getFooter: function (accountList) {
				var footer = new FooterLayout({
					collection: accountList
				});
				return footer;
			},
			getContent: function (accountList) {
				var footer = new AllAccounts.ListView({
					collection:accountList
				});
				return footer;
			},
			// Set the filter to show complete or all items
			filterItems: function (filter) {
				var newFilter = filter && filter.trim() || 'all';
				filterChannel.request('filterState').set('filter', newFilter);
			}
		});
		return Controller;
	});