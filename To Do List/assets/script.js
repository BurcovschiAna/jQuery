$(document).ready(function () {
    let message;
    $("#new-list").on("keypress", function(e){
        message = $(this).val();
        if (message) {            
            if (e.key === "Enter") {
            $(".list-container").append(`
                <div class="list">
                    <p>${message}</p>
                    <img src="./assets/img/check.svg" class="check">
                     <img src="./assets/img/trash.svg" alt="" class="delete">
                </div>
                `);
            $(this).val("");
            }
        }
        
        $(".delete").on("click", deleteItem);
        $(".check").on("click", check);
    });

    $(".delete").on("click", deleteItem);
    $(".check").on("click", check);
    function deleteItem() {
        $(this).parent().hide(2000, function() {
            $(this).remove(); 
        });
    }
    function check(){
        $(this).parent().toggleClass("checked");
        $(this).prev().toggleClass("checked-p")
    }
    $(".list-container").sortable()
});