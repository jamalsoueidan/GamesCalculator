window.LekhaRoundView = Backbone.View.extend({	
    template:_.template($('#lekha-round').html()),
	events: {
		"click a#done": 'save',
		'change input[data-type="range"]': "sliderChange",
		'change input[name="rest"]': 'restChange'
	},
	initialize: function(id) {
		this.id = id
		this.rounds = localStorage.getObj('lekha')
		this.allowedSum = [36, 49, 39, 59, 60]
		
		if ( this.id != undefined ) {
			this.record = 'edit'
			this.round = this.rounds[id];
		} else {
			this.record = 'new'
			this.round = []
			this.id = this.rounds.length
		}
	},
	sliderChange: function(event) {
		this.validateSum();
	},
	restChange:function(event) {
		event.preventDefault();
		
		// it must get optimized
		if (this.rest != undefined) {
			var slider = this.rest[0]
			slider.attr('value', this.rest[1])
			slider.slider('refresh')
		}
		
		var player = $(event.target).attr('id').substring(6, 7)
		var slider = $('#player' + player + '_slider')
		var totalHeartSum = 0;
		//var slider = $('#' + player + '_slider')
		
		_.each([1,2,3,4], function(key) {
			if (key != player) {
				var playerSlider = $('#player' + key + '_slider')
				totalHeartSum += parseInt(playerSlider.attr('value'))
			}
		});
		
		var missingHeartSum = 13 - totalHeartSum
		var playerHeartSum = parseInt(slider.attr('value'))
		
		var newPlayerHeartSum = Math.abs(playerHeartSum - missingHeartSum)
				
		slider.attr('value', newPlayerHeartSum)
		slider.slider('refresh')
		
		this.rest = [slider, playerHeartSum]
	},
	validateSum: function() {
		//10 + 13 + 13 = 36
		//20 + 13 + 13 = 46
		//10 + 26 + 13 = 39
		//20 + 26 + 13 = 59
		
		
		if (this.allowedSum.indexOf(this.getTotalInputValues())>-1) {
			$('#done').removeClass('ui-disabled');
		} else {
			$('#done').addClass('ui-disabled');
		}
	},
	getTotalInputValues: function() {
		all = this.getAllInputValues().join(',').split(',')
		totalInputValues = 0;
		$.each(all, function(key) {
			value = parseInt(all[key])
			if (value > 0) {
				totalInputValues += value
			}
		})
		return totalInputValues;	
	},
	setAllInputValues: function() {
		var parent = this
		_.each(this.round, function(value, key) {
			playerId = key+1
			
			var target = $(parent.el).find('div[data-group-id="player' + playerId + '"]')

			if (value[0] > 0)
				target.find('input[value="' + value[0]+ '"]').attr('checked','checked');
				
			if (value[1] > 0)
				target.find('input[value="' + value[1]+ '"]').attr('checked','checked');

			$(parent.el).find('#player' + + playerId + '_slider').attr('value', value[2])
		})
	},
	getAllInputValues: function() {
		var parent = this
		var allPlayerValues = []

		_.each([1,2,3,4], function(key) {

			var target = $('div[data-group-id="player' + key + '"]')
			var playerValues = [0,0,0]

			//diamond
			target.find('input[name=diamond]:checked').each(function() {
				playerValues[0] = parseInt($(this).val())
			});
			
			//queen
			target.find('input[name=queen]:checked').each(function() {
				playerValues[1] = parseInt($(this).val())
			});
			
			//hearts
			playerValues[2] = parseInt($("#player" + key + "_slider").val());
			
			allPlayerValues.push(playerValues)
		});
		
		// return [10, 26, 13] 
		// means [diamon, queen, hearts]
		
		return allPlayerValues
	},
	save: function(event) {
		event.preventDefault();
		this.rounds[this.id] = this.getAllInputValues();
		localStorage.setObj('lekha', this.rounds)
		Backbone.history.navigate("#lekha", true);
	},
    render:function () {
        $(this.el).html(this.template({	player1: localStorage.getItem('player1'),
										player2: localStorage.getItem('player2'),
										player3: localStorage.getItem('player3'),
										player4: localStorage.getItem('player4')}));
										
		this.setAllInputValues();
			
		if ( this.record == 'new' ) {
			$(this.el).find('#done').addClass('ui-disabled');
		}
        return this;
    }
});