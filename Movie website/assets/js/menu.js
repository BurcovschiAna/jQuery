$(document).ready(function () {

// * Menu
    $(".burger-menu").on("click", function () {
        $(this).toggleClass("open");
        if($(".header-container-small").hasClass("open")){

            $(".header-container-small").removeClass("open");
            $(".brand").css("transform", "translateX(0%)").show(1000);
            $(".menu-container").css("transform", "translateX(-1000%)").hide(500);
        } else{
            $(".header-container-small").addClass("open");
            $(".brand").css("transform", "translateX(-1000%)").hide();
            $(".menu-container").css("transform", "translateX(0%)").show(1000);
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
        minLength: 3,
        autoFocus: true,
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
    
    let htmlContent = '';
    const topMovies = allMovies.slice(0, 6); 
    topMovies.forEach((movie, index) => {
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
    $("#top-rated").on("click", ".movie-item",function () {
        let movieIndex = $(this).attr("data-index"); 
        localStorage.setItem('selectedMovieIndex', movieIndex);
    });
    $("#top-rated").on("mouseover", ".movie-item", function () {
        $(this).find(".overlay").removeClass("hidden"); 
    });
    $("#top-rated").on("mouseout", ".movie-item", function () {
        $(this).find(".overlay").addClass("hidden");
    });
    
    $("#top-rated").html(htmlContent);
});