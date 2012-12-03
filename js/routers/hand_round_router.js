window.HandRoundView = Backbone.View.extend({	
    template:_.template($('#hand-round').html()),
	events: {
		"click a#done": 'save'
	},
	initialize: function(id) {
		this.id = id
	},
	setup: function() {
		if ( this.id == undefined) return;
		
		rounds = localStorage.getObj('hand')
		round = rounds[this.id]
		
		var parent = this
		_.each(round, function(key, value) {
			$(parent.el).find('#player' + (value + 1) + '_slider').attr('value', key)	
		})
	},
	save: function(event) {
		event.preventDefault();
		rounds = localStorage.getObj('hand')
		
		if (!Array.isArray(rounds)) {
			rounds = [];
		}
		
		round = [];
		
		for(var i=1;i<5;i++) round.push(parseInt($("#player" + i + "_slider").val()));
		
		if (this.id != undefined) {
			rounds[this.id] = round
		} else {
			rounds.push(round)
		}
		
		localStorage.setObj('hand', rounds)
		Backbone.history.navigate("#hand", true);
	},
    render:function () {
        $(this.el).html(this.template({	player1: localStorage.getItem('player1'),
										player2: localStorage.getItem('player2'),
										player3: localStorage.getItem('player3'),
										player4: localStorage.getItem('player4')}));
										
		this.setup();
		
        return this;
    }
});