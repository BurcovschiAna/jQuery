$(document).ready(function () {
    const imgContainer = $(".img"); // Select the image container
    const totalImages = $(".img img").length; // Get the total number of images
    let currentIndex = 0; // Initialize the current index for the slideshow
    let slideInterval; // Variable to hold the interval for automatic slide transitions
    // Regular expressions for form validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email pattern
    const phonePattern = /^\+?[0-9\s()-]{7,15}$/; // Phone number pattern
    const namePattern = /^[a-zA-Z]+$/; // Name pattern (only letters)
    const messagePattern = /[A-Za-z.,!?;:'"()\-]{1,100}/; // Message pattern (letters and punctuation)

    // * Slide Show
    function updateDots() {
        $(".dot").removeClass("active"); // Remove active class from all dots
        $(".dot").eq(currentIndex).addClass("active"); // Add active class to the current dot
    }

    function moveToIndex(index) {
        imgContainer.css("transform", `translateX(-${index * 100}%)`); // Move image container to show the current image
        updateDots(); // Update the dot indicators
    }

    $("#prev").on("click", function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1; // Decrement index or loop to last image
        moveToIndex(currentIndex); // Move to the new index
        resetInterval(); // Reset the slide interval
    });

    $("#next").on("click", nexSlide); // Set up next button click event

    $(".dot").on("click", function () {
        currentIndex = $(this).index(); // Get the index of the clicked dot
        moveToIndex(currentIndex); // Move to the corresponding image
    });

    function nexSlide() {  
        currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0; // Increment index or loop to first image
        moveToIndex(currentIndex); // Move to the new index
        resetInterval(); // Reset the slide interval
    }

    function resetInterval() {
        clearInterval(slideInterval); // Clear the existing interval
        slideInterval = setInterval(nexSlide, 8000); // Set a new interval for automatic slide transitions
    }

    resetInterval(); // Start the slide interval

    // * Modal
    $("#modal").dialog({
        modal: true, // Make the modal dialog modal
        draggable: false, // Prevent dragging of the dialog
        resizable: false, // Prevent resizing of the dialog
        classes: {
            "ui-dialog": "modal", // Add custom modal class
            "ui-dialog-titlebar": "modal" // Add custom title bar class
        },
        autoOpen: false, // Prevent the dialog from opening automatically
    });

    // * Contact Form
    $(".send-btn").on("click", function () {
        // Validate the form inputs
        if(validForm($("#email").val(), $("#first-name").val(), $("#last-name").val(), $("#phone").val(), $("#message").val())){
            $("#modal").dialog("open"); // Open the modal dialog
            // Send email using EmailJS
            emailjs.send("service_l4zx1sz", "template_1a47tqv", {
                first_name: $("#first-name").val(),
                last_name: $("#last-name").val(),
                phone: $("#phone").val(),
                email: $("#email").val(),
                message: $("#message").val()
            });
        } else{
            return; // If validation fails, exit the function
        }
    });

    // Function to validate form inputs
    function validForm(email, firstName, lastName, phone, message){
        let isValid = true; // Initialize validity flag

        // Validate email
        if(email === ""){
            $("#invalid-email").html("You must enter an email"); // Show error message
            $("#invalid-email").removeClass("hidden"); // Display error
            isValid = false; // Set validity to false
        } else if(!emailPattern.test(email)){
            $("#invalid-email").removeClass("hidden"); // Show error message for invalid email
            $("#invalid-email").html("Invalid email");
            isValid = false;
        } else{
            $("#invalid-email").addClass("hidden"); // Hide error message if valid
        }

        // Validate first name
        if(firstName === ""){
            $("#invalid-first-name").html("You must enter your first name"); // Show error message
            $("#invalid-first-name").removeClass("hidden"); // Display error
            isValid = false;
        } else if(!namePattern.test(firstName)){
            $("#invalid-first-name").html("Invalid first name"); // Show error for invalid first name
            $("#invalid-first-name").removeClass("hidden");
        } else{
            $("#invalid-first-name").addClass("hidden"); // Hide error if valid
        }

        // Validate last name
        if(lastName === ""){
            $("#invalid-last-name").html("You must enter your last name"); // Show error message
            $("#invalid-last-name").removeClass("hidden"); // Display error
            isValid = false;
        } else if(!namePattern.test(lastName)){
            $("#invalid-last-name").html("Invalid last name"); // Show error for invalid last name
            $("#invalid-last-name").removeClass("hidden");
            isValid = false;
        } else{
            $("#invalid-last-name").addClass("hidden"); // Hide error if valid
        }

        // Validate phone number
        if(phone === ""){
            $("#invalid-phone").html("You must enter your phone number"); // Show error message
            $("#invalid-phone").removeClass("hidden"); // Display error
            isValid = false;
        } else if(!phonePattern.test(phone)){
            $("#invalid-phone").html("Invalid phone number"); // Show error for invalid phone number
            $("#invalid-phone").removeClass("hidden");
            isValid = false;
        } else{
            $("#invalid-phone").addClass("hidden"); // Hide error if valid
        }

        // Validate message
        if(message === " " || message === ""){
            $("#invalid-message").html("You must enter a message"); // Show error message
            $("#invalid-message").removeClass("hidden"); // Display error
            isValid = false;
        } else if(!messagePattern.test(message)){
            $("#invalid-message").html("Your message must contain only letters and punctuation marks and be up to 100 characters long."); // Show error for invalid message
            $("#invalid-message").removeClass("hidden");
            isValid = false;
        } else{
            $("#invalid-message").addClass("hidden"); // Hide error if valid
        }
        
        return isValid; // Return overall validity
    }
});
