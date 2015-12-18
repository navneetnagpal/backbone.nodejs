define(["require", "exports", "marionette"], function (require, exports, Marionette) {
   
    // Layout Header View
	// ------------------
	var HeaderLayout = Backbone.Marionette.ItemView.extend({

		template: '#template-header',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		ui: {
			txtaccNo: '#txt-accno',
			txtcash: '#txt-cash',
			txtname: '#txt-name',
			typeSaving:'#chk-savings',
			typeCurrent:'#chk-current',
			save:'#btn-save',
			reset:'#btn-reset'
			
		},

		events: {
			// 'keypress@ui.input': 'onInputKeypress',
			'click @ui.save': 'onSave',
			'click @ui.reset': 'onReset'
		}, 
		onReset:function(e){
			this.ui.txtaccNo.val("");
			this.ui.txtname.val("");
			this.ui.txtcash.val("");
			this.ui.typeSaving.prop("checked",true);
			this.ui.typeCurrent.prop("checked",false);
			this.clearAll();
		},
		markInvalid:function(el){
			el.parent().addClass('invalid').removeClass('valid');
		},
		clearInvalid:function(el){
			el.parent().addClass('valid').removeClass('invalid');
			
		},
		clearAll:function(){
			this.clearInvalid(this.ui.txtaccNo);
			this.clearInvalid(this.ui.txtname);
			this.clearInvalid(this.ui.txtcash);	
		},
		validate:function(){
			var valid=true;
			this.clearAll();
			if (this.ui.txtaccNo.val().trim()===""){
				this.markInvalid(this.ui.txtaccNo);
				valid=false;
			}
			if (this.ui.txtname.val().trim()===""){
				this.markInvalid(this.ui.txtname);
				valid=false;
			}
			if (this.ui.txtcash.val().trim()===""){
				this.markInvalid(this.ui.txtcash);
				valid=false;
			}			
			return valid;
		},
		// According to the spec
		// If escape is pressed during the edit, the edit state should be left and any changes be discarded.
		onSave: function (e) {
			if (this.validate()){
				this.collection.create({
					accNo:this.ui.txtaccNo.val().trim(),
					name:this.ui.txtname.val().trim(),
					cash:this.ui.txtcash.val().trim(),
					acType:(this.ui.typeSaving.prop("checked")?"savings":"current"),
					legend:"blue",
					marketValue:900,
					closed:false
				});
			}
		},
		// According to the spec
		// If escape is pressed during the edit, the edit state should be left and any changes be discarded.
		onInputKeyup: function (e) {
			var ESC_KEY = 27;

			if (e.which === ESC_KEY) {
				this.render();
			}
		},

		onInputKeypress: function (e) {
			var ENTER_KEY = 13;
			var todoText = this.ui.input.val().trim();

			if (e.which === ENTER_KEY && todoText) {
				this.collection.create({
					title: todoText
				});
				this.ui.input.val('');
			}
		}
	});
	return HeaderLayout;
});