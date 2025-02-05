$(document).ready(function () {
    const video = $("#main-video");

    // Function to toggle play and pause state
    function playPause() {
        if (video[0].paused) {
            play(); // If video is paused, call play function
        } else {
            pause(); // If video is playing, call pause function
        }
    }

    // Function to play the video
    function play() {
        $(".play").html("pause"); // Change button text to "pause"
        video[0].play(); // Play the video
    }

    // Function to pause the video
    function pause() {
        $(".play").html("play_arrow"); // Change button text to "play"
        video[0].pause(); // Pause the video
    }

    // Update button text when video plays
    $(video).on("play", function () {
        $(".play").html("pause");
    });

    // Update button text when video pauses
    $(video).on("pause", function () {
        $(".play").html("play_arrow");
    });

    // Toggle play/pause on video click
    $(video).on("click", function () {
        playPause();
    });

    // Toggle play/pause with space key
    $(document).on("keydown", function (e) {
        if (e.key === " " || e.code === "Space") {
            e.preventDefault(); // Prevent default space key behavior
            playPause();
        }
    });

    // Play/pause on play button click
    $(".play").on("click", playPause);

    // Forward video by 10 seconds
    $(".forward").on("click", function () {
        video[0].currentTime += 10;
    });

    // Replay video by 10 seconds
    $(".replay").on("click", function () {
        video[0].currentTime -= 10;
    });

    // Display video duration when data is loaded
    $(video).on("loadeddata", function (e) {
        let duration = e.target.duration; // Get video duration
        let totalMin = Math.floor(duration / 60); // Calculate minutes
        let totalSec = Math.floor(duration % 60); // Calculate seconds
        totalSec = totalSec < 10 ? "0" + totalSec : totalSec; // Format seconds
        $(".duration").html(`${totalMin}:${totalSec}`); // Show duration
    });

    // Update current time and progress bar during playback
    $(video).on("timeupdate", function (e) {
        let currentTime = e.target.currentTime; // Get current time
        let currentMin = Math.floor(currentTime / 60); // Calculate minutes
        let currentSec = Math.floor(currentTime % 60); // Calculate seconds
        currentSec = currentSec < 10 ? "0" + currentSec : currentSec; // Format seconds
        $(".current-time").html(`${currentMin}:${currentSec}`); // Show current time

        let duration = e.target.duration; // Get video duration
        let progress = (currentTime / duration) * 100; // Calculate progress percentage
        $(".progress-bar").css("width", `${progress}%`); // Update progress bar width
    });

    // Seek video when progress bar is clicked
    $(".progress").on("click", function (e) {
        let duration = video[0].duration; // Get video duration
        let progress = $(this).width(); // Get progress bar width
        let offset = e.offsetX; // Get click position
        video[0].currentTime = (offset / progress) * duration; // Set video time
    });

    // Show current time on progress bar hover
    $(".progress").on("mousemove", function (e) {
        let progressWidth = $(this).width(); // Get progress bar width
        let x = e.offsetX; // Get mouse position
        let duration = video[0].duration; // Get video duration
        let progress = Math.floor((x / progressWidth) * duration); // Calculate time
        let currentMin = Math.floor(progress / 60); // Calculate minutes
        let currentSec = Math.floor(progress % 60); // Calculate seconds
        currentSec = currentSec < 10 ? "0" + currentSec : currentSec; // Format seconds
        $('.progres-time').css('--x', `${x}px`); // Position tooltip
        $(".progres-time").css("display", "block"); // Show tooltip
        $(".progres-time").html(`${currentMin}:${currentSec}`); // Display time in tooltip
    });

    // Hide tooltip when mouse leaves progress bar
    $(".progress").on("mouseleave", function () {
        $(".progres-time").css("display", "none"); // Hide tooltip
    });

    // Adjust volume when slider changes
    $("#volume").on("change", function () {
        video[0].volume = $(this).val() / 100; // Set video volume
        // Change volume icon based on volume level
        if ($(this).val() == 0) {
            $(".volume").html("volume_off");
        } else if ($(this).val() < 40) {
            $(".volume").html("volume_down");
        } else {
            $(".volume").html("volume_up");
        }
    });

    // Toggle volume on volume icon click
    $(".volume").on("click", function () {
        if ($("#volume").val() == 0) {
            video[0].volume = 0.8; // Set volume to 80%
            $("#volume").val(80); // Update slider
            $(".volume").html("volume_up"); // Change icon
        } else {
            video[0].volume = 0; // Mute video
            $("#volume").val(0); // Update slider
            $(".volume").html("volume_off"); // Change icon
        }
    });

    // Toggle settings menu visibility
    $("#settings").on("click", function () {
        $(".settings").fadeToggle(500); // Toggle settings visibility
    });

    // Request Picture-in-Picture mode
    $("#picture-in-picture").on("click", function () {
        video[0].requestPictureInPicture(); // Enable Picture-in-Picture
    });

    // Toggle fullscreen mode
    $("#fullscreen").on("click", function () {
        if ($("#video-player").hasClass("openFullScreen")) {
            $("#video-player").removeClass("openFullScreen"); // Remove fullscreen class
            document.exitFullscreen(); // Exit fullscreen
            $(this).text("fullscreen"); // Change button text
        } else {
            $("#video-player").addClass("openFullScreen"); // Add fullscreen class
            $("#video-player")[0].requestFullscreen(); // Enter fullscreen
            $(this).text("fullscreen_exit"); // Change button text
        }
    });

    // Handle fullscreen change event
    document.addEventListener("fullscreenchange", function () {
        if (!document.fullscreenElement) {
            $("#video-player").removeClass("openFullScreen"); // Remove fullscreen class
            $("#fullscreen").text("fullscreen"); // Change button text
        }
    });

    // Change playback speed
    $(".playback div").on("click", function () {
        $(".playback div").each(function () {
            $(this).removeClass("active"); // Remove active class from all
        });
        $(this).addClass("active"); // Add active class to clicked item
        let speed = $(this).attr("data-speed"); // Get speed value
        video[0].playbackRate = speed; // Set playback speed
    });

    // Show/hide controls on mouse movement
    $(video).on("mousemove", showControls);
    let mouseTimer;

    function showControls() {
        $(".controls-container").stop().slideDown(); // Show controls
        clearTimeout(mouseTimer); // Clear existing timer
        mouseTimer = setTimeout(() => {
            $(".controls-container").stop().slideUp(); // Hide controls after timeout
        }, 3000);
    }

    // Hide controls when mouse leaves video
    $(video).on("mouseleave", function () {
        clearTimeout(mouseTimer); // Clear timer
        $(".controls-container").stop().slideUp(); // Hide controls
    });

    // Keep controls visible on mouse enter
    $(".controls-container").on("mouseenter", function () {
        $(".controls-container").stop().slideDown(); // Show controls
        clearTimeout(mouseTimer); // Clear timer
    });

    // Hide controls on mouse leave
    $(".controls-container").on("mouseleave", function () {
        clearTimeout(mouseTimer); // Clear timer
        mouseTimer = setTimeout(() => {
            $(".controls-container").stop().slideUp(); // Hide controls after timeout
        }, 3000);
    });

    // Load movie details from localStorage
    let movieIndex = localStorage.getItem("selectedMovieIndex");
    if (movieIndex) {
        movieIndex = JSON.parse(movieIndex); // Parse index
        $("#movie-img").attr("src", allMovies[movieIndex].moviePoster); // Set movie poster
        $("#movie-name").text(allMovies[movieIndex].movieName); // Set movie name
        $("#rating-number").text(allMovies[movieIndex].movieRating); // Set movie rating

        let stars = '';
        const fullStars = Math.floor(allMovies[movieIndex].movieRating); // Calculate full stars
        const halfStar = allMovies[movieIndex].movieRating % 1 !== 0; // Check for half star

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="bi bi-star-fill"></i>'; // Add full stars
        }

        if (halfStar) {
            stars += '<i class="bi bi-star-half"></i>'; // Add half star
        }

        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
            stars += '<i class="bi bi-star"></i>'; // Add empty stars
        }

        $("#selected-movie-rating").html(stars); // Display stars
    }

    // Function to generate stars based on rating
    function generateStars(rating) {
        const fullStars = Math.floor(rating); // Calculate full stars
        const halfStar = rating % 1 !== 0; // Check for half star
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="bi bi-star-fill"></i>'; // Add full stars
        }

        if (halfStar) {
            stars += '<i class="bi bi-star-half"></i>'; // Add half star
        }

        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
            stars += '<i class="bi bi-star"></i>'; // Add empty stars
        }

        return stars; // Return generated stars
    }

    // Update user rating on star click
    $('#user-rating i').on('click', function () {
        const ratingValue = $(this).data('value'); // Get rating value from clicked star
        const starsHTML = generateStars(ratingValue); // Generate stars for rating
        $('#user-rating').html(starsHTML); // Update user rating display
    });
});
