window.LekhaRoundView = Backbone.View.extend({	
    template:_.template($('#lekha-round').html()),
	events: {
		"click a#done": 'save',
		'change input[data-type="range"]': "sliderChange"
	},
	initialize: function(id) {
		this.id = id
	},
	setup: function() {
		if ( this.id == undefined) return;
		
		rounds = localStorage.getObj('lekha')
		round = rounds[this.id]
		
		var parent = this
		_.each(round, function(key, value) {
			$(parent.el).find('#player' + (value + 1) + '_slider').attr('value', key)	
			$(parent.el).find('#player1_slider').attr('value', '12')	
		})
	},
	sliderChange: function(event) {
		// 10 + 13 + 13 = 36
		// 20 + 13 + 13 = 46
		// 10 + 26 + 13 = 39
		// 20 + 26 + 13 = 59
		
		correct = [36, 46, 39, 50]
		num = 0;
		for(var i=1;i<5;i++) {
			num += parseInt($('#player'+i+'_slider').val())
		}
		
		if (correct.indexOf(num)>-1) {
			$('#done').removeClass('ui-disabled');
		} else {
			$('#done').addClass('ui-disabled');
		}
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
		
		if (this.id != undefined) {
			rounds[this.id] = round
		} else {
			rounds.push(round)
		}
		
		localStorage.setObj('lekha', rounds)
		Backbone.history.navigate("#lekha", true);
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