
define(["require", "exports","backbone", "marionette"], function (require, exports, Backbone, Marionette) {
    var Menu={};
	Menu.Menu = Backbone.Model.extend({
		defaults:{
			id:"not-set",
			text:"Untitled"
		},
		initialize:function(){
			if (this.isNew()){
				this.set('created',Date.now());
			}
		},
		toggle: function () {
			return this.set('visible', !this.isVisible());
		},

		isVisible: function () {
			return this.get('visible');
		}
	});
	Menu.MenuList = Backbone.Collection.extend({
		model: Menu.Menu,

		localStorage: new Backbone.LocalStorage('todos-backbone-marionette'),

		comparator: 'created',
 
 		getActive: function () {
			return this.reject(this._isCompleted);
		},

		_isCompleted: function (todo) {
			return todo.isVisible();
		}
	});
    return Menu;
});