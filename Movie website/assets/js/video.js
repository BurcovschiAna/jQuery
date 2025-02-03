$(document).ready(function () {
    const video = $("#main-video");

    function playPause() {
        if (video[0].paused) {
            play();
        } else {
            pause();
        }
    }

    function play() {
        $(".play").html("pause");
        video[0].play();
    }

    function pause() {
        $(".play").html("play_arrow");
        video[0].pause();
    }

    $(video).on("play", function () {
        $(".play").html("pause");
    });


    $(video).on("pause", function () {
        $(".play").html("play_arrow");
    });

    $(video).on("click", function () {
        $(".play").html("pause");
        play()
    });

    $(".play").on("click", playPause);

    $(".forward").on("click", function () {
        video[0].currentTime += 10;
    });

    $(".replay").on("click", function () {
        video[0].currentTime -= 10;
    });

    $(video).on("loadeddata", function (e) {
        let duration = e.target.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        totalSec = totalSec < 10 ? "0" + totalSec : totalSec;
        $(".duration").html(`${totalMin}:${totalSec}`);
    });

    $(video).on("timeupdate", function (e) {
        let currentTime = e.target.currentTime;
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        currentSec = currentSec < 10 ? "0" + currentSec : currentSec;
        $(".current-time").html(`${currentMin}:${currentSec}`);
        let duration = e.target.duration;
        let progres = (currentTime / duration) * 100;
        $(".progress-bar").css("width", `${progres}%`);
    });

    $(".progress").on("click", function (e) {
        let duration = video[0].duration;
        let progress = $(this).width();
        let offset = e.offsetX;
        video[0].currentTime = (offset / progress) * duration;
    });

    $(".progress").on("mousemove", function (e) {
        let progresWidth = $(this).width();
        let x = e.offsetX;
        let duration = video[0].duration;
        let progres = Math.floor((x / progresWidth) * duration);
        let currentMin = Math.floor(progres / 60);
        let currentSec = Math.floor(progres % 60);
        currentSec = currentSec < 10 ? "0" + currentSec : currentSec;
        $('.progres-time').css('--x', `${x}px`);
        $(".progres-time").css("display", "block");
        $(".progres-time").html(`${currentMin}:${currentSec}`);
    });

    $(".progress").on("mouseleave", function () {
        $(".progres-time").css("display", "none");
    });

    $("#volume").on("change", function () {
        video[0].volume = $(this).val() / 100;
        if ($(this).val() == 0) {
            $(".volume").html("volume_off");
        } else if ($(this).val() < 40) {
            $(".volume").html("volume_down");
        } else {
            $(".volume").html("volume_up");
        }
    });

    $(".volume").on("click", function () {
        if ($("#volume").val() == 0) {
            video[0].volume = 0.8;
            $("#volume").val(80);
            $(".volume").html("volume_up");
        } else {
            video[0].volume = 0;
            $("#volume").val(0);
            $(".volume").html("volume_off");
        }
    });

    $("#settings").on("click", function () {
        $(".settings").fadeToggle(500);
    });

    $("#picture-in-picture").on("click", function () {
        video[0].requestPictureInPicture();
    });

    $("#fullscreen").on("click", function () {
        if (video.hasClass("openFullScreen")) {
            video.removeClass("openFullScreen");
            $(".controls-container").addClass("");
            document.exitFullscreen();
            $(this).text("fullscreen");
        } else {
            video.addClass("openFullScreen");
            video[0].requestFullscreen();
            $(this).text("fullscreen_exit");
        }
    });
    
    $(".playback div").on("click", function () {
        $(".playback div").each(function () {
            $(this).removeClass("active");
        });
        $(this).addClass("active");
        let speed = $(this).attr("data-speed");
        video[0].playbackRate = speed;
    });
    $(video).on("mouseover", function () {
        $(".controls-container").slideDown();
    });
    $(video).on("mouseleave", function () {
        $(".controls-container").slideUp();
    });
    $(".controls-container").on("mouseover", function () {
        $(this).css("display", "block");
    });





  
    let movieIndex= localStorage.getItem("selectedMovieIndex");
    movieIndex=  JSON.parse(movieIndex)
    $("#movie-img").attr("src", allMovies[movieIndex].moviePoster);
    $("#movie-name").text(allMovies[movieIndex].movieName);
    $("#rating-number").text(allMovies[movieIndex].movieRating);
    
    let stars = '';
    const fullStars = Math.floor(allMovies[movieIndex].movieRating);
    const halfStar = allMovies[movieIndex].movieRating % 1 !== 0; 

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="bi bi-star-fill"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="bi bi-star-half"></i>';
    }
    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
        stars += '<i class="bi bi-star"></i>';
    }

    $("#selected-movie-rating").html(stars);







    
});
