define(["require", "exports", "marionette"], function (require, exports, Marionette) {

    var AppRoute = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'*filter': 'filterItems'
		}
	});
 
    return AppRoute;
});