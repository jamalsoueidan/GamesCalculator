window.LekhaView = Backbone.View.extend({	
    template:_.template($('#lekha').html()),
	events: {
		"click a#new":'newGame',
		"click a#yes":"createNewGame"
	},
	initialize: function() {
		this.row = _.template($('#row').html(), {column1: '', 
												 column2: '<strong>' + localStorage.getItem('player1') + '</strong>',
												 column3: '<strong>' + localStorage.getItem('player2') + '</strong>',
												 column4: '<strong>' + localStorage.getItem('player3') + '</strong>',
												 column5: '<strong>' + localStorage.getItem('player4') + '</strong>'})
	},
	newGame:function(event) {
		event.preventDefault();
		$("#popupDialog").popup("open");
	},
	createNewGame: function(event) {
		event.preventDefault();
		localStorage.setObj('lekha', []);
		this.setupTable();
		$("#popupDialog").popup("close");
	},
    render:function () {
        $(this.el).html(this.template());
		this.setupTable();
		
        return this;
    },
	setupTable:function() {
		$(this.el).find('ul').html(this.row);
		rounds = localStorage.getObj('lekha')
		var calculations = [0,0,0,0];
		if (Array.isArray(rounds)) {
			for(var i=0;i<rounds.length;i++) {
				currentRound = rounds[i];
				row = _.template($('#row').html(), { column1: '<a href="#" data-role="button">' + (i+1) +'</a>', 
												     column2: currentRound[0], 
													 column3: currentRound[1], 
												     column4: currentRound[2],
												     column5: currentRound[3]})
				$(this.el).find('ul').append(row);
				for(var p=0;p<4;p++) calculations[p] += currentRound[p]
			}
		}
		
		this.calculate(calculations);
	},
	calculate:function(total) {
		row = _.template($('#row').html(), { column1: '<strong>Total:</strong>', 
										     column2: total[0], 
											 column3: total[1], 
										     column4: total[2],
										     column5: total[3]})
		$(this.el).find('ul').append(row);
	}
});

