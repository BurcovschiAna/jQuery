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
    
    // * contact form
    $(".send-btn").on("click", function () {
        if(validForm($("#email").val())){
            // emailjs.send("service_l4zx1sz", "template_1a47tqv", {
            //     first_name: $("#first-name").val(),
            //     last_name: $("#last-name").val(),
            //     phone: $("#phone").val(),
            //     email:$("#email").val(),
            //     message: $("#message").val()
            // }) .then(function(response) {
            //     console.log('Email sent:', response);
            //     alert('Email-ul a fost expediat cu succes!');
            // }, function(error) {
            //     console.error('Error sending email:', error);
            //     alert('Emaul-ul nu a fost expediat!');
            // });
        } else{
            return;
        }
        
    });
    function validForm(email, firstName, lastName, message){
        let isValit = true;
        if(!emailPattern.test(email)){
            $("#invalid-email").removeClass("hidden");
            $("#invalid-email").html("Invalid emal");
            isValit = false
        } else if(email === ""){
            $("#invalid-email").html("You must enter an email");
            $("#invalid-email").removeClass("hidden");
        } else{
            $("#invalid-email").addClass("hidden");
        }
        if(firstName === ""){
            $("#invalid-first-name").html("You must enter your first name");
            $("#invalid-first-name").removeClass("hidden");
        } else if(!namePattern.test(firstName)){

        }
        if(lastName === ""){
            $("#invalid-first-name").html("You must enter your first name");
            $("#invalid-first-name").removeClass("hidden");
        }
    }

    
});
