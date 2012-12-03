window.LekhaRoundView = Backbone.View.extend({	
    template:_.template($('#lekha-round').html()),
	events: {
		"click a#done": 'save',
		'change input[data-type="range"]': "sliderChange"
	},
	initialize: function(id) {
		this.id = id
		this.rounds = localStorage.getObj('lekha')
		
		if ( this.id != undefined ) {
			this.record = 'edit'
			this.round = this.rounds[id];
		} else {
			this.record = 'new'
			this.round = []
			this.id = this.rounds.length
		}
	},
	setup: function() {
		var parent = this
		_.each(this.round, function(value, key) {
			playerId = key+1
			
			for(var i=0;i<value[0].length;i++)
				$(parent.el).find('div[data-group-id="player' + playerId + '"]').find('input[value="' + value[0][i]+ '"]').attr('checked','checked');

			$(parent.el).find('#player' + + playerId + '_slider').attr('value', value[1])
		})
	},
	sliderChange: function(event) {
		this.validateSum();
	},
	validateSum: function() {
		// 10 + 13 + 13 = 36
		// 20 + 13 + 13 = 46
		// 10 + 26 + 13 = 39
		// 20 + 26 + 13 = 59
		
		allowedSum = [36, 46, 39, 59, 60]
		totalSum = 0;
		
		all = this.getPlayerTotal().join(',').split(',')
		$.each(all, function(key) {
			value = parseInt(all[key])
			if (value > 0) {
				totalSum += value
			}
		})

		if (allowedSum.indexOf(totalSum)>-1) {
			$('#done').removeClass('ui-disabled');
		} else {
			$('#done').addClass('ui-disabled');
		}
		console.log('called')
	},
	getPlayerTotal: function() {
		var parent = this
		var round = []
		_.each([1,2,3,4], function(key) {
			var radios = []
			
			$('div[data-group-id="player' + key + '"]').find('input:checked').each(function() {
				radios.push(parseInt($(this).val()))
			});
			
			var slider = parseInt($("#player" + key + "_slider").val());
			
			round.push([radios, slider])
		});
		return round	
	},
	save: function(event) {
		event.preventDefault();
		
		 //reset the round score every time, and save from the start
		this.round = this.getPlayerTotal();
		this.rounds[this.id] = this.round
		localStorage.setObj('lekha', this.rounds)
		Backbone.history.navigate("#lekha", true);
	},
    render:function () {
        $(this.el).html(this.template({	player1: localStorage.getItem('player1'),
										player2: localStorage.getItem('player2'),
										player3: localStorage.getItem('player3'),
										player4: localStorage.getItem('player4')}));
										
		this.setup();
		
		if ( this.record == 'new' ) {
			$(this.el).find('#done').addClass('ui-disabled');
		}
        return this;
    }
});