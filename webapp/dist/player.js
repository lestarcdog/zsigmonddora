(function() {

    var iframe = document.querySelector("#vid");
    var player = new Vimeo.Player(iframe);

    player.setVolume(0.4);
    //player.play();

    var onPlay = function(evt) {
        console.log(evt);
    }

    player.on("play",onPlay);

})();
