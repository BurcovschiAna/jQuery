$(document).ready(function() {
    const itemsPerPage = 12; // Number of items to display per page
    let currentPage = 1; // Initialize the current page
    let filteredMovies = allMovies; // Store the filtered list of movies
    let pages = Math.ceil(filteredMovies.length / itemsPerPage); // Calculate total pages based on filtered movies

    // Event listener for category selection
    $(".category-item").on("click", function () {
        let category = $(this).find(".subtitle").text().trim(); // Get the selected category
        localStorage.setItem("Category", JSON.stringify(category)); // Store category in local storage
        currentPage = 1; // Reset to the first page
        filterMoviesByCategory(category); // Filter movies by selected category
    });

    // Function to filter movies based on the selected category
    function filterMoviesByCategory(category) {
        filteredMovies = allMovies.filter(movie => movie.movieCategory.includes(category)); // Filter movies
        displayMovies(filteredMovies); // Display the filtered movies
    }

    // Function to initialize category filtering on page load
    function initCategory() {
        const selectedCategory = localStorage.getItem("Category"); // Get the stored category from local storage
        currentPage = 1; // Reset to the first page
        filteredMovies = allMovies.filter(movie => movie.movieCategory.includes(JSON.parse(selectedCategory))); // Filter movies
        displayMovies(filteredMovies); // Display the filtered movies
    };
    initCategory(); // Call the initialization function

    // Function to render pagination controls
    function renderPagination() {
        $("#pages").html(""); // Clear existing pagination
        pages = Math.ceil(filteredMovies.length / itemsPerPage); // Recalculate total pages
        for (let i = 1; i <= pages; i++) {
            let activeClass = (i === currentPage) ? "active" : ""; // Determine if the page is active
            $("#pages").append(`<span class="${activeClass}" data-page="${i}">${i}</span>`); // Create page number element
        }
        // Event listener for page number click
        $("#pages span").on("click", function() {
            currentPage = $(this).data('page'); // Set current page based on clicked number
            displayMovies(filteredMovies); // Display movies for the selected page
        });
    }
    
    // Function to display movies on the current page
    function displayMovies(source) { 
        $("#movies").html(""); // Clear existing movie display
        let cards = []; // Array to hold movie cards
        
        source.forEach(movie => {
            let card = $('<div class="movie-item"></div>')
                .attr("data-type", movie.movieCategory) // Set data attributes for category and index
                .attr("data-index", movie.movieIndex);
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
            card.html(cardContent); // Set HTML content for the card
            cards.push(card); // Add card to the array
        });
        showPage(currentPage, cards); // Show cards for the current page
        $("#movies").on("mouseover", ".movie-item", showOverlay); // Show overlay on mouse over
        $("#movies").on("mouseout", ".movie-item", hideOverlay); // Hide overlay on mouse out
        $(".movie-item").on("click",function () {
            let movieIndex = $(this).attr("data-index"); // Get the movie index from the clicked item
            localStorage.setItem('selectedMovieIndex', movieIndex); // Store index in local storage
        });
    }

    // Function to display the specific page of movie cards
    function showPage(page, cards) {
        $("#movies").html(""); // Clear existing movie display
        const start = (page - 1) * itemsPerPage; // Calculate start index for slicing
        const end = start + itemsPerPage; // Calculate end index for slicing
        const pageCards = cards.slice(start, end); // Get the cards for the current page

        pageCards.forEach(card => {
            $("#movies").append(card); // Append each card to the movie display
        });
        renderPagination(); // Render pagination controls
    }

    // Function to generate star rating HTML based on movie rating
    function generateStars(rating) {
        let stars = ''; // Initialize stars string
        const fullStars = Math.floor(rating); // Calculate number of full stars
        const halfStar = rating % 1 !== 0; // Check if there's a half star

        // Append full stars to the stars string
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="bi bi-star-fill"></i>';
        }
        // Append half star if applicable
        if (halfStar) {
            stars += '<i class="bi bi-star-half"></i>';
        }

        // Append empty stars to complete five stars
        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
            stars += '<i class="bi bi-star"></i>';
        }

        return stars; // Return the stars HTML
    }

    // Function to show overlay on mouse over
    function showOverlay() {
        $(this).find(".overlay").removeClass("hidden"); // Show overlay
    }

    // Function to hide overlay on mouse out
    function hideOverlay() {
        $(this).find(".overlay").addClass("hidden"); // Hide overlay
    }

    // Event listener for next page button
    $('#next').on('click', function() {
        const totalPages = Math.ceil(filteredMovies.length / itemsPerPage); // Calculate total pages
        if (currentPage < totalPages) {
            currentPage++; // Increment current page
            displayMovies(filteredMovies); // Display movies for the new page
        }
    });

    // Event listener for previous page button
    $('#prev').on('click', function() {
        if (currentPage > 1) {
            currentPage--; // Decrement current page
            displayMovies(filteredMovies); // Display movies for the new page
        }
    });
});
