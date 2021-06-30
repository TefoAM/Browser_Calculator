function getHistory(){
    return document.getElementById("history-value").innerText;
}

function printHistory(num){
    document.getElementById("history-value").innerText = num;
}

function getOutput(){
    return document.getElementById("output-value").innerText;
}

function printOutput(num){
    if(num==""){
        document.getElementById("output-value").innerText = num;
    }
    else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num){
    if(num=="-"){
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString(n);
    value = value.replace(/,/g, "  ");
    return value
}

function reverseNumberFormat(num){
    // converts string back to number
    return Number(num.replace(/ /g,""));
}

var operator = document.getElementsByClassName("operator");
for(let i=0; i<operator.length; i++){
    operator[i].addEventListener('click',function(){
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id=="backspace"){
            var value = getOutput().substring(0,getOutput().length-1);
            value = value.replace(/ /g,"");
            printOutput(value);
        }
        else {
            var output = getOutput();
            var history = getHistory();
            if(output==""&&history!=""){
                if(isNaN(history[history.length-1])){
                    history = history.substring(0,history.length-1);
                }
            }

            if(output!="" || history!=""){
                output = output==""? output:reverseNumberFormat(output);
                history = history + output;
                if(this.id=="="){
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }

    })
}

var number = document.getElementsByClassName("number");
for(let i=0; i<number.length; i++){
    number[i].addEventListener('click',function(){
        var output = reverseNumberFormat(getOutput()); //reverse string to number here.
        if(output!=NaN){
            output = output + this.id;
            printOutput(output);
        }
    })
}