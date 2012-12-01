window.LekhaRoundView = Backbone.View.extend({	
    template:_.template($('#lekha-round').html()),
	events: {
		"click a#done": 'save'
	},
	save: function(event) {
		event.preventDefault();
		rounds = localStorage.getObj('lekha')
		
		if (!Array.isArray(rounds)) {
			rounds = [];
		}
		
		round = [];
		
		for(var i=1;i<5;i++) {
			round.push(parseInt($("#player" + i + "_slider").val()));
		}
		
		rounds.push(round)
		localStorage.setObj('lekha', rounds)
		Backbone.history.navigate("#lekha", true);
	},
    render:function () {
        $(this.el).html(this.template({	player1: localStorage.getItem('player1'),
										player2: localStorage.getItem('player2'),
										player3: localStorage.getItem('player3'),
										player4: localStorage.getItem('player4')}));
        return this;
    }
});

