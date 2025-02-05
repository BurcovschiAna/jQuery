$(document).ready(function () {
    // * Menu
    $(".burger-menu").on("click", function () {
        $(this).toggleClass("open"); // Toggle the burger menu's open class
        if($(".header-container-small").hasClass("open")){ // Check if the header is open
            $(".header-container-small").removeClass("open"); // Close the header
            $(".brand").css("transform", "translateX(0%)").show(1000); // Show the brand logo
            $(".menu-container").css("transform", "translateX(-1000%)").hide(500); // Hide the menu container
        } else{
            $(".header-container-small").addClass("open"); // Open the header
            $(".brand").css("transform", "translateX(-1000%)").hide(); // Hide the brand logo
            $(".menu-container").css("transform", "translateX(0%)").show(1000); // Show the menu container
        }
    });

    // * Category
    $(".category-item").on("click", function () {
        localStorage.clear(); // Clear local storage
        let category = $(this).find(".subtitle").text().trim(); // Get the category name from the clicked item
        localStorage.setItem("Category", JSON.stringify(category)); // Store the selected category in local storage
    });

    // * Autocomplete
    let movieNames = allMovies.map(movie => movie.movieName); // Create an array of movie names for autocomplete
    $("#search, #search-small").autocomplete({
        source: movieNames, // Set the source for the autocomplete
        minLength: 3, // Minimum length of input before suggestions appear
        autoFocus: true, // Automatically focus on the first suggestion
        select: function (event, ui) {
            let selectedMovie = allMovies.find(movie => movie.movieName === ui.item.value); // Find the selected movie
            if (selectedMovie) {
                localStorage.setItem('selectedMovieIndex', selectedMovie.movieIndex); // Store the selected movie index in local storage
                window.location.href = `video.html?movie=${encodeURIComponent(ui.item.value)}`; // Redirect to the video page for the selected movie
            }
        }
    });

    // * Top Rated
    allMovies.sort((a, b) => b.movieRating - a.movieRating); // Sort movies by rating in descending order
    
    let htmlContent = ''; // Initialize HTML content string
    const topMovies = allMovies.slice(0, 6); // Get the top 6 rated movies
    topMovies.forEach((movie, index) => {
        let stars = ''; // Initialize stars string for rating
        const fullStars = Math.floor(movie.movieRating); // Calculate the number of full stars
        const halfStar = movie.movieRating % 1 !== 0; // Check if there is a half star

        // Append full stars to the stars string
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="bi bi-star-fill"></i>'; // Add full star icon
        }
        // Append half star if applicable
        if (halfStar) {
            stars += '<i class="bi bi-star-half"></i>'; // Add half star icon
        }
        // Append empty stars to complete five stars
        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
            stars += '<i class="bi bi-star"></i>'; // Add empty star icon
        }
        
        // Create the HTML content for each top-rated movie
        htmlContent += `
        <a href="./video.html">
            <div class="movie-item" data-index="${movie.movieIndex}"> 
                <div>
                    <div class="top-rating">${index + 1}</div> 
                    <img src="${movie.moviePoster}" alt=""> 
                </div>
                <div>
                    <p class="label">${movie.movieName}</p> 
                    <div class="rating flexbox">${stars}</div> 
                </div>
                <div class="overlay flexbox hidden"> 
                    <img src="./assets/img/svg/play.svg" alt="Play">
                </div>
            </div>
         </a>
        `;                   
    });

    // Event listener for movie item click in the top-rated section
    $("#top-rated").on("click", ".movie-item", function () {
        let movieIndex = $(this).attr("data-index"); // Get the movie index from the clicked item
        localStorage.setItem('selectedMovieIndex', movieIndex); // Store the selected movie index in local storage
    });

    // Event listener for mouseover to show overlay effect
    $("#top-rated").on("mouseover", ".movie-item", function () {
        $(this).find(".overlay").removeClass("hidden"); // Show overlay when mouse hovers over movie item
    });

    // Event listener for mouseout to hide overlay effect
    $("#top-rated").on("mouseout", ".movie-item", function () {
        $(this).find(".overlay").addClass("hidden"); // Hide overlay when mouse leaves movie item
    });
    
    $("#top-rated").html(htmlContent); // Set the generated HTML content to the top-rated section
});
