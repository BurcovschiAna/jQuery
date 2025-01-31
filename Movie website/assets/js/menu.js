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
});


