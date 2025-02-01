$(document).ready(function () {
    const video = $("#main-video")[0];
    //? Play video
    function playPause(){
        if(video.paused){
            play()
        } else{
            pause()
        }
    }
    function play() {
        $(".play").html("pause");
        video.play();
    }
    function pause(){
        $(".play").html("play_arrow");
        video.pause();
    }
    $(video).on("play", function() {
        $(".play").html("Pause");
    });

    $(video).on("pause", function() {
        $(".play").html("play_arrow");
    });
    $(".play").on("click", playPause);

    // ! forward
    $(".forward").on("click", function () {
        video.currentTime += 10;
    });
    // ! rewind
    $(".replay").on("click", function () {
        video.currentTime -= 10;
    });

    // ! Duration
    $(video).on("loadeddata", function (e) {
        let duration = e.target.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        totalSec < 10 ? totalSec = "0" + totalSec : totalSec;
        $(".duration").html(`${totalMin}:${totalSec}`);
    });
    // ! Current time
    $(video).on("timeupdate", function (e) {
        let currentTime = e.target.currentTime;
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
        $(".current-time").html(`${currentMin}:${currentSec}`);
        let duration = e.target.duration;
        let progres = (currentTime / duration) * 100;
        $(".progress-bar").css("width", `${progres}%`);
    });

    // ! progress bar
    $(".progress").on("click", function (e) {
        let duration = video.duration;
        console.log(duration);
        let progress = $(".progress")[0].clientWidth;
        let offset = e.offsetX;
        video.currentTime = (offset / progress) * duration 
    });
    // ! volume
    $("#volume").on("change", function () {
        video.volume = $(this).val() / 100;
        if($(this).val() == 0){
            $(".volume").html("volume_off");
        } else if($(this).val() < 40){
            $(".volume").html("volume_down");
        } else {
            $(".volume").html("volume_up");
        } 
    });
    $(".volume").on("click", function () {
        if($("#volume").val() == 0){
            video.volume = 0.8
            $("#volume").val(80);
            $(".volume").html("volume_up");
        } else{
            video.volume = 0
            $("#volume").val(0);
            $(".volume").html("volume_off");
        }
    });
});