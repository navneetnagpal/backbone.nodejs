define(["require", "exports", "marionette"], function (require, exports, Marionette) {
   
    var AppLayout = Marionette.LayoutView.extend({
        template: "#layout-template",
        el: '#main-app',
        regions: {
            menu: "#menu",
            content: "#content"
        }
    });

 
    return AppLayout;
});