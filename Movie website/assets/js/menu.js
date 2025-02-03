$(document).ready(function () {

// * Menu
    $(".burger-menu").on("click", function () {
        $(this).toggleClass("open");
        if($(".header-container-small").hasClass("open")){

            $(".header-container-small").removeClass("open");
            $(".brand").css("transform", "translateX(0%)").show(500);
            $(".menu-container").css("transform", "translateX(-1000%)").hide();
        } else{
            $(".header-container-small").addClass("open");
            $(".brand").css("transform", "translateX(-1000%)").hide();
            $(".menu-container").css("transform", "translateX(0%)").show(500);
        }

    });

    // * Category
    $(".category-item").on("click", function () {
        localStorage.clear();
        let category = $(this).find(".subtitle").text().trim();
        localStorage.setItem("Category", JSON.stringify(category));
        
    });
    // * autocomplete
    let movieNames = allMovies.map(movie => movie.movieName);
    $("#search, #search-small").autocomplete({
        source: movieNames,
        select: function (event, ui) {
            let selectedMovie = allMovies.find(movie => movie.movieName === ui.item.value);
            if (selectedMovie) {
                
                localStorage.setItem('selectedMovieIndex', selectedMovie.movieIndex);
                
                window.location.href = `video.html?movie=${encodeURIComponent(ui.item.value)}`;
            }
        }
    });

    // * top rated
    allMovies.sort((a, b) => b.movieRating - a.movieRating);

    // Construct HTML for the top 6 movies
    let htmlContent = '';
    const topMovies = allMovies.slice(0, 6); // Get only the top 6 movies

    topMovies.forEach((movie, index) => {
        // Construct star rating HTML
        let stars = '';
        const fullStars = Math.floor(movie.movieRating);
        const halfStar = movie.movieRating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="bi bi-star-fill"></i>';
        }
        if (halfStar) {
            stars += '<i class="bi bi-star-half"></i>';
        }
        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
            stars += '<i class="bi bi-star"></i>';
        }

        // Append movie item to htmlContent
        htmlContent += `
            <div class="movie-item">
                <div>
                    <div class="top-rating">${index + 1}</div>
                    <img src="${movie.moviePoster}" alt="">
                </div>
                <div>
                    <p class="label">${movie.movieName}</p>
                    <div class="rating flexbox">${stars}</div>
                </div>
            </div>
        `;
    });

    // Insert constructed HTML into the top-rated container
    $("#top-rated").html(htmlContent);
});