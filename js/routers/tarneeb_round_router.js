window.TarneebRoundView = Backbone.View.extend({	
    template:_.template($('#tarneeb-round').html()),
	initialize: function(id) {
		this.id = id
	},
    render:function () {
        $(this.el).html(this.template({	player1: localStorage.getItem('player1'),
										player2: localStorage.getItem('player2'),
										player3: localStorage.getItem('player3'),
										player4: localStorage.getItem('player4')}));
										
        return this;
    }
});