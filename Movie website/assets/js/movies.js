$(document).ready(function() {
    const itemsPerPage = 12; // Set the number of movie items to display per page
    let currentPage = 1;  // Initialize the current page to 1
    let pages = Math.ceil(allMovies.length / itemsPerPage); // Calculate the total number of pages based on allMovies length

    // Function to render pagination controls
    function renderPagination() {
        $("#pages").html(""); // Clear existing pagination controls
        for(let i = 1; i <= pages; i++) { // Loop through each page
            let activeClass = (i === currentPage) ? "active" : ""; // Determine if the page is the current page
            $("#pages").append(`<span class="${activeClass}" data-page="${i}">${i}</span>`); // Add page number to the pagination
        }
        // Attach click event to each page number
        $("#pages span").on("click", function() {
            currentPage = $(this).data('page'); // Update current page based on clicked page number
            displayMovies(allMovies); // Refresh the displayed movies
        });
    }
    
    // Function to display movies on the current page
    function displayMovies(source) { 
        $("#movies").html(""); // Clear existing movie items
        let cards = []; // Array to hold movie card elements
        
        // Iterate through each movie in the source array
        source.forEach(movie => {
            let card = $('<div class="movie-item"></div>').attr("data-type", movie.movieCategory).attr("data-index", movie.movieIndex); // Create a movie card
            let cardContent = `
                <a href="./video.html">
                    <div>
                        <img src="${movie.moviePoster}" alt="${movie.movieName}"> 
                    </div>
                    <div>
                        <p class="label">${movie.movieName}</p> 
                        <div class="rating flexbox" data-rating="${movie.movieRating}">
                            ${generateStars(movie.movieRating)} 
                        </div>
                    </div>
                    <div class="overlay flexbox hidden"> 
                        <img src="./assets/img/svg/play.svg" alt="Play"> 
                    </div>
                </a>
            `;
            card.html(cardContent); // Set the HTML content for the card
            cards.push(card); // Add the card to the cards array
        });
        showPage(currentPage, cards); // Show the current page of movie cards
        // Attach mouseover and mouseout events for overlay effect
        $("#movies").on("mouseover", ".movie-item", showOverlay);
        $("#movies").on("mouseout", ".movie-item", hideOverlay);
        // Store the selected movie index in localStorage on card click
        $(".movie-item").on("click", function () {
            let movieIndex = $(this).attr("data-index");            
            localStorage.setItem('selectedMovieIndex', movieIndex); // Save selected movie index
        });
    }

    // Function to display a specific page of movie cards
    function showPage(page, cards) {
        $("#movies").html(""); // Clear existing movie items
        const start = (page - 1) * itemsPerPage; // Calculate starting index for the current page
        const end = start + itemsPerPage; // Calculate ending index for the current page
        const pageCards = cards.slice(start, end); // Get the cards for the current page

        // Append each card to the movies container
        pageCards.forEach(card => {
            $("#movies").append(card); // Add the card to the movies section
        });
        renderPagination(); // Render pagination controls
    }

    // Function to generate star rating based on movie rating
    function generateStars(rating) {
        let stars = ''; // Initialize stars string
        const fullStars = Math.floor(rating); // Calculate the number of full stars
        const halfStar = rating % 1 !== 0; // Check if there is a half star

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

        return stars; // Return generated stars HTML
    }

    // Function to show overlay effect on movie item hover
    function showOverlay() {
        $(this).find(".overlay").removeClass("hidden"); // Show overlay when mouse hovers over movie item
    }

    // Function to hide overlay effect when not hovering
    function hideOverlay() {
        $(this).find(".overlay").addClass("hidden"); // Hide overlay when mouse leaves movie item
    }

    // Next button click event to go to the next page
    $('#next').on('click', function() {
        const totalPages = Math.ceil(allMovies.length / itemsPerPage); // Calculate total pages
        if (currentPage < totalPages) { // Check if there are more pages
            currentPage++; // Increment current page
            displayMovies(allMovies); // Refresh movie display
        }
    });

    // Previous button click event to go to the previous page
    $('#prev').on('click', function() {
        if (currentPage > 1) { // Check if not on the first page
            currentPage--; // Decrement current page
            displayMovies(allMovies); // Refresh movie display
        }
    });

    // Initial call to display movies on page load
    displayMovies(allMovies); // Display movies when the page loads
});
