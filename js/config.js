$(document).bind("mobileinit", function () {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;

    // Remove page from DOM when it's being replaced
    $('div[data-role="page"]').live('pagehide', function (event, ui) {
        $(event.currentTarget).remove();
    });

	if ( localStorage.getItem('player1') == null ) {
		localStorage.setItem('player1', "Right");
		localStorage.setItem('player2', "Front");
		localStorage.setItem('player3', "Left");
		localStorage.setItem('player4', "Me");
	}
});

//http://stackoverflow.com/a/6663237
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}