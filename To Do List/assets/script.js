// jQuery code to manage the To-Do List functionality
$(document).ready(function () {
    let message; // Variable to hold the message from the input

    // Event listener for keypress in the input field
    $("#new-list").on("keypress", function(e) {
        message = $(this).val(); // Get the value from the input
        if (message) { // Check if there is a message
            if (e.key === "Enter") { // Check if the Enter key is pressed
                // Append a new list item to the list container
                $(".list-container").append(`
                    <div class="list">
                        <p>${message}</p> <!-- Display the message -->
                        <img src="./assets/img/check.svg" class="check" alt="Check"> <!-- Check icon -->
                        <img src="./assets/img/trash.svg" alt="Delete" class="delete"> <!-- Delete icon -->
                    </div>
                `);
                $(this).val(""); // Clear the input field
            }
        }
        
        // Attach click event handlers for delete and check icons
        $(".delete").on("click", deleteItem);
        $(".check").on("click", check);
    });

    // Initial event handlers for existing delete and check icons
    $(".delete").on("click", deleteItem);
    $(".check").on("click", check);

    // Function to delete an item
    function deleteItem() {
        $(this).parent().hide(2000, function() {
            $(this).remove(); // Remove the item from the DOM after hiding
        });
    }

    // Function to check an item
    function check() {
        $(this).parent().toggleClass("checked"); // Toggle checked class on the parent
        $(this).prev().toggleClass("checked-p"); // Toggle strikethrough on the paragraph
    }

    // Make the list container sortable
    $(".list-container").sortable();
});