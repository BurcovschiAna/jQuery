$(document).ready(function() {
    const itemsPerPage = 12;
    let currentPage = 1;  
    let pages = Math.ceil(allMovies.length / itemsPerPage);

    function renderPagination() {
        $("#pages").html(""); 
        for(let i = 1; i <= pages; i++) {
            let activeClass = (i === currentPage) ? "active" : "";
            $("#pages").append(`<span class="${activeClass}" data-page="${i}">${i}</span>`);
        }
        $("#pages span").on("click", function() {
        currentPage = $(this).data('page'); 
        displayMovies(allMovies); 
    });
    }
    
    function displayMovies(source) { 
        $("#movies").html(""); 
        let cards = []; 
        
        source.forEach(movie => {
            let card = $('<div class="movie-item"></div>').attr("data-type", movie.movieCategory).attr("data-index", movie.movieIndex);
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
            card.html(cardContent);
            cards.push(card); 
        });
        showPage(currentPage, cards);
        $("#movies").on("mouseover", ".movie-item", showOverlay);
        $("#movies").on("mouseout", ".movie-item", hideOverlay);
    }

    function showPage(page, cards) {
        $("#movies").html(""); 
        const start = (page - 1) * itemsPerPage; 
        const end = start + itemsPerPage; 
        const pageCards = cards.slice(start, end); 

        pageCards.forEach(card => {
            $("#movies").append(card);
        });
        renderPagination();
    }

   
    function generateStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0; 

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="bi bi-star-fill"></i>';
        }
        if (halfStar) {
            stars += '<i class="bi bi-star-half"></i>';
        }

        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
            stars += '<i class="bi bi-star"></i>';
        }

        return stars;
    }

    function showOverlay() {
        $(this).find(".overlay").removeClass("hidden"); 
    }

    function hideOverlay() {
        $(this).find(".overlay").addClass("hidden"); 
    }

   
    $('#next').on('click', function() {
        const totalPages = Math.ceil(allMovies.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayMovies(allMovies);
        }
    });

    $('#prev').on('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayMovies(allMovies);
        }
    });

    displayMovies(allMovies);

    // $(".category-item").on("click", function () {
    //     localStorage.clear();
    //     let category = $(this).find(".subtitle").text().trim();
    //     localStorage.setItem("Category", JSON.stringify(category));
        
    // });
});
