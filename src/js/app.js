define(["require", "exports", "marionette", "js/app.layout"], function (require, exports, Marionette, AppLayout) {
    var Application = new Marionette.Application();

    Application.on("start", function () {
        var layout = new AppLayout();
        layout.render();
        console.log("Application has started!");
    });
    return Application;
});