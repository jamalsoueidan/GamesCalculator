window.PlayersView = Backbone.View.extend({
    template:_.template($('#players').html()),
	events: {
		"click #save": "save"
	},
	save: function(event ){
		event.preventDefault();
		for(var i=1; i<5; i++) {
			target = 'player' + i
			localStorage.setItem(target, $(this.el).find('#' + target).val());
		}
		Backbone.history.navigate("#games", true);
	},
    render:function () {
        $(this.el).html(this.template());

		for(var i=1; i<5; i++) {
			target = 'player' + i
			$(this.el).find('#' + target).val(localStorage.getItem(target));
		}
		
        return this;
    }
});