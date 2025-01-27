$(document).ready(function () {
    let currentInput = "0";
    let lastInput = "";
    let expression = "";
    let result = "";
    updateScreen(currentInput);
    $(".btn").on("click", function () {
        let button = $(this).html();
        if (button === "C") {
            lastInput = "";
            currentInput = "0";
            expression = "";
            updateScreen(currentInput);
        } else if (button === "CE") {
            currentInput = "0";                    
        } else if (button === "🔙") {                    
            if (currentInput.length > 0) {                        
                currentInput = currentInput.substr(0, currentInput.length - 1);
            }
        } else if ($(this).attr("data-operation") === "=") {  
                if (currentInput) {
                    expression += currentInput; 
                    console.log(expression);
                    
                } else{
                    return;
                }
                if (isLastCharacterOperator(expression)) {
                    expression = expression.slice(0, -1); 
                }   
                result = eval(expression);     
                if (result === Infinity || result === -Infinity) {
                    updateScreen("Error");
                    currentInput = "0";
                    expression = "";
                    return;
                } else{
                    updateScreen(result);
                    currentInput = result.toString();
                    expression = "";
                    return;
                }        
        } else if (button === "+/-") {
            currentInput = `(${(currentInput * -1).toString()})`;
            
        } else if (button === ",") { 
            
            if (!/\./.test(currentInput)) {
                if (currentInput === "") {
                    currentInput = "0."; 
                } else {
                    currentInput += "."; 
                }
            }
        } else if($(this).attr("data-operation") === "squared"){
            currentInput *= 2
        }else if($(this).attr("data-operation") === "sqrt"){
            currentInput = Math.sqrt(currentInput);
        }else if($(this).attr("data-operation") === "division"){
            currentInput = 1 / currentInput;
        }else if (isOperator($(this))) {
            if (currentInput) {
                lastInput = currentInput
                expression += lastInput + $(this).attr("data-operation");
                if (isLastCharacterOperator(expression)){
                    expression = expression.slice(0, -1); 
                    expression += $(this).attr("data-operation");
                }  
                currentInput = "0";
            }
        } else if (button === "%"){
            currentInput = currentInput / 100;
        } else if (number(button)){
            if(currentInput === "0"){
                currentInput = button;
            } else{
                currentInput += button; 
            }                  
            
        }
        updateScreen(currentInput)
    });

    function isOperator(btn) {
        const operation = btn.attr("data-operation"); 
        return operation === "/" || operation === "*" || operation === "+" || operation === "-";
    }
    function isLastCharacterOperator(expression) {
        const lastChar = expression.charAt(expression.length - 1);
        return lastChar === "/" || lastChar === "*" || lastChar === "+" || lastChar === "-";
    }
    function number(value){                               
        return !isNaN(value);
    }
    function updateScreen(value) {
        $(".screen").html(value);
    }
    $(".btn").on("click", function () {
        $(this).addClass("pressed");
        setTimeout(() => $(this).removeClass("pressed"), 300);
    });
});