define(["require", "exports", "marionette"], function (require, exports, Marionette) {

	var AccountModel={};
	AccountModel.Account = Backbone.Model.extend({
		defaults:  {
			"name": "Unnamed",
			"marketValue": 0,
			"cash": 0,
			"legend": "blue",
			"acType":"savings",
			"closed":false
		},

		initialize: function () {
			if (this.isNew()) {
				this.set('created', Date.now());
			}
		},
		isSavingsAc:function(){
			return this.get('acType')==='savings';
		},
		isClosed:function(){
			return this.get('closed');
		},
		toggle:function(){
			return this.set('closed', !this.isClosed());
		},
		matchesFilter: function (filter) {
			
			if (filter === 'others') {
				return !this.isSavingsAc();
			}
			if (filter === 'savings') {
				return this.isSavingsAc();
			}
			return true;
		}
		
	});

	// Todo Collection
	// ---------------
	AccountModel.AccountList = Backbone.Collection.extend({
		model: AccountModel.Account,
		url:'/accounts',
		
		// localStorage: new Backbone.LocalStorage('accounts-backbone-marionette'),

		comparator: 'created',

		getSavings: function () {
			return this.filter(this._isSavingsAc);
		},

		getOthers: function () {
			return this.reject(this._isSavingsAc);
		},

		_isSavingsAc: function (account) {
			return account.isSavingsAc();
		}
	});
	
	return AccountModel;
});