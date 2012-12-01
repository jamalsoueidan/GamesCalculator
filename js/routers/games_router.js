window.GamesView = Backbone.View.extend({	
    template:_.template($('#games').html()),

    render:function () {
        $(this.el).html(this.template());
        return this;
    }
});

