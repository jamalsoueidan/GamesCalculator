window.LekhaView = Backbone.View.extend({	
    template:_.template($('#lekha').html()),
	events: {
		"click a#new":'newGame',
		"click a#yes":"createNewGame"
	},
	initialize: function() {
		this.rounds = localStorage.getObj('lekha')
		
		if (!Array.isArray(this.rounds)) {
			localStorage.setObj('lekha', [])
		}
		
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
		this.rounds = localStorage.getObj('lekha')
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

		var calculations = [0,0,0,0];
		var parent = this
		_.each(this.rounds, function(round, key) {
			row = _.template($('#row').html(), { column1: '<a href="#lekha-round/' + key + '" data-role="button">' + (key+1) +'</a>', 
											     column2: parent.calculateSum(round[0]), 
												 column3: parent.calculateSum(round[1]), 
											     column4: parent.calculateSum(round[2]), 
											     column5: parent.calculateSum(round[3])}); 
			$(parent.el).find('ul').append(row);
			
			calculations[0] = parent.calculateSum(round[0], 'total')
			calculations[1] = parent.calculateSum(round[1], 'total')
			calculations[2] = parent.calculateSum(round[2], 'total')
			calculations[3] = parent.calculateSum(round[3], 'total')
		})
		
		this.calculateTotal(calculations);
	},
	calculateSum:function(roundColumn, key) {
		if ( key == 'total' ) {
			calculate = roundColumn.join(',').split(',')
			total = 0
			for(i=0;i<calculate.length;i++) 
				total += parseInt(calculate[i])
				
			if (isNaN(total))
				return 0
			else
				return total
		} else {
			value = roundColumn.join(', ').replace(/, 0/g,'')
			if ( value == '') 
				return 0
			else
				return value
		}
	},
	calculateTotal:function(total) {
		row = _.template($('#row').html(), { column1: '<strong>Total:</strong>', 
										     column2: total[0], 
											 column3: total[1], 
										     column4: total[2],
										     column5: total[3]})
		$(this.el).find('ul').append(row);
	}
});

