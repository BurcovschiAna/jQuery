$(document).ready(function () {
    const imgContainer = $(".img");
    const totalImages = $(".img img").length;
    let currentIndex = 0;
    let slideInterval;
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
// * Slide Show
    function updateDots() {
        $(".dot").removeClass("active");
        $(".dot").eq(currentIndex).addClass("active");
    }

    function moveToIndex(index) {
        imgContainer.css("transform", `translateX(-${index * 100}%)`);
        updateDots();
    }

    $("#prev").on("click", function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
        moveToIndex(currentIndex);
        resetInterval();
    });

    $("#next").on("click", nexSlide);

    $(".dot").on("click", function () {
        currentIndex = $(this).index();
        moveToIndex(currentIndex);
    });
    function nexSlide() {  
        currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
        moveToIndex(currentIndex);
        resetInterval();
    }
    function resetInterval() {
        clearInterval(slideInterval); 
        slideInterval = setInterval(nexSlide, 8000); 
    }
    resetInterval();
    
    
});


