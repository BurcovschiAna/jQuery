$(document).ready(function () {
    const imgContainer = $(".img");
    const imgWidth = parseInt($(".img img").css("width")); 
    const totalImages = $(".img img").length;
    
    let currentIndex = 0;

    $("#prev").on("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            imgContainer.animate({
                left: `+=${imgWidth}`
            }, 500);
        } else{
            currentIndex = totalImages - 1; 
            imgContainer.animate({
                left: `-=${imgWidth * (totalImages - 1)}`
            }, 500);
            
        }
    });
    $("#next").on("click", function () {        
        if (currentIndex < totalImages - 1) {
            currentIndex++;
            imgContainer.animate({
                left: `-=${imgWidth}`
            }, 500);
        } else{
            currentIndex = 0
            imgContainer.animate({
                left: `0`
            }, 500);
        }
    });
});
