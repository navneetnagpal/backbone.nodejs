
define('app', ["require", "exports", "marionette", "js/app.layout", "js/app.ctrl","js/app.routes"], function (require, exports, Marionette, AppLayout, AppController,AppRoutes) {
    var Application = Marionette.Application.extend({
        setRootLayout: function () {
            this.root = new AppLayout();
        }
    });
    var App = new Application();
    App.on("before:start", function () {
        App.setRootLayout();
    });
    App.on("start", function () {
        var controller = new AppController();
        controller.router = new AppRoutes({
            controller:controller
        });
        controller.start();
        
        App.root.showChildView('header', controller.header);
        App.root.showChildView('footer', controller.footer);
        App.root.showChildView('content',controller.content);
        controller.accountList.fetch();
    });
    return App;
});