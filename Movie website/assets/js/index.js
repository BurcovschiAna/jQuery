$(document).ready(function () {
    const imgContainer = $(".img");
    const totalImages = $(".img img").length;
    let currentIndex = 0;
    let slideInterval;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\+?[0-9\s()-]{7,15}$/; 
    const namePattern = /^[a-zA-Z]+$/; 

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
    
    // * modal
    $("#modal").dialog({
        modal: true,
        draggable: false,
        resizable: false,
        classes: {
            "ui-dialog": "modal",
            "ui-dialog-titlebar": "modal"
        },
        autoOpen: false,
    })
    // * contact form
    $(".send-btn").on("click", function () {
        if(validForm($("#email").val(), $("#first-name").val(), $("#last-name").val(), $("#phone").val(), $("#message").val())){
            $("#modal").dialog("open")
            emailjs.send("service_l4zx1sz", "template_1a47tqv", {
                first_name: $("#first-name").val(),
                last_name: $("#last-name").val(),
                phone: $("#phone").val(),
                email:$("#email").val(),
                message: $("#message").val()
            });
        } else{
            return;
        }
        
    });
    function validForm(email, firstName, lastName, phone, message){
        let isValid = true;
        if(email === ""){
            $("#invalid-email").html("You must enter an email");
            $("#invalid-email").removeClass("hidden");
            isValid = false
        } else if( !emailPattern.test(email)){
            $("#invalid-email").removeClass("hidden");
            $("#invalid-email").html("Invalid emal");
            isValid = false;
        } else{
            $("#invalid-email").addClass("hidden");
        }
        
        if(firstName === ""){
            $("#invalid-first-name").html("You must enter your first name");
            $("#invalid-first-name").removeClass("hidden");            
            isValid = false
        } else if(!namePattern.test(firstName)){
            $("#invalid-first-name").html("Ivalid first name");
            $("#invalid-first-name").removeClass("hidden");
        } else{
            $("#invalid-first-name").addClass("hidden");
        }

        if(lastName === ""){
            $("#invalid-last-name").html("You must enter your last name");
            $("#invalid-last-name").removeClass("hidden");
            isValid = false
        } else if(!namePattern.test(lastName)){
            $("#invalid-last-name").html("Invalid last name");
            $("#invalid-last-name").removeClass("hidden");
            isValid = false
        } else{
            $("#invalid-last-name").addClass("hidden");
        }

        if(phone === ""){
            $("#invalid-phone").html("You must enter your phone number");
            $("#invalid-phone").removeClass("hidden");
            isValid = false
        } else if(!phonePattern.test(phone)){
            $("#invalid-phone").html("Invalid phone number");
            $("#invalid-phone").removeClass("hidden");
            isValid = false
        } else{
            $("#invalid-phone").addClass("hidden");
        }

        if(message === ""){
            $("#invalid-message").html("You must enter a message");
            $("#invalid-message").removeClass("hidden");
            isValid = false
        } else{
            $("#invalid-message").addClass("hidden");
        }
        console.log(phone);
        
        return isValid;
    }

    
});
