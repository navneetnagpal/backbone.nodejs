define(["require", "exports", "marionette"], function (require, exports, Marionette) {
   
    var AppLayout = Marionette.LayoutView.extend({
        el: '#main-app',
        regions: {
            header: "#header",
            content: "#content",
            footer: "#footer"
        }
    });

 
    return AppLayout;
});