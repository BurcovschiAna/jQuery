// $(document).ready(function () {
//     const imgContainer = $(".img");
//     const totalImages = $(".img img").length;
    
//     let currentIndex = 0;

//     $("#prev").on("click", function () {
//         const imgWidth = parseInt($(".img img").css("width"));
//         if (currentIndex > 0) {
//             currentIndex--;
//             imgContainer.animate({
//                 left: `+=${imgWidth}`
//             }, 500);
//         } else{
//             currentIndex = totalImages - 1; 
//             imgContainer.animate({
//                 left: `-=${imgWidth * (totalImages - 1)}`
//             }, 500);
            
//         }
//     });
//     $("#next").on("click", function () {
//         const imgWidth = parseInt($(".img img").css("width"));        
//         if (currentIndex < totalImages - 1) {
//             currentIndex++;
//             imgContainer.animate({
//                 left: `-=${imgWidth}`
//             }, 500);
//         } else{
//             currentIndex = 0
//             imgContainer.animate({
//                 left: `0`
//             }, 500);
//         }
//     });
// });


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
    // setTimeout(setInterval(nexSlide, 8000), 8000)
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
        clearInterval(slideInterval); // Clear the existing interval
        slideInterval = setInterval(nexSlide, 8000); // Set a new interval
    }
    resetInterval();
});


