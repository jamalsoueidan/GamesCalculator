window.TarneebView = Backbone.View.extend({	
    template:_.template($('#tarneeb').html()),
    render:function () {
        $(this.el).html(this.template());
        return this;
    }
});

