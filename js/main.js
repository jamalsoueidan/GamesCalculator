var AppRouter = Backbone.Router.extend({

    routes:{
        "":"games",
		"games":"games",
        "players":"players",
		"lekha":'lekha',
		'lekha-round':'lekhaRound'
    },

    initialize:function () {
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },

    games:function () {
        this.changePage(new GamesView());
    },
    players:function () {
        this.changePage(new PlayersView());
    },
	lekha: function() {
		this.changePage(new LekhaView());
	},
	lekhaRound: function() {
		this.changePage(new LekhaRoundView());
	},
    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();

        $('body').append($(page.el));

        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }

        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
});