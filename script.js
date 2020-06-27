var questions = [{
    question: "1. How do you write 'Hello World' in an alert box?",
    choices: ["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"],
    correctAnswer: 3
}, {
    question: "2. How to empty an array in JavaScript?",
    choices: ["arrayList[]", "arrayList(0)", "arrayList.length=0", "arrayList.len(0)"],
    correctAnswer: 2
}, {
    question: "3. What function to add an element at the begining of an array and one at the end?",
    choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
    correctAnswer: 1
}, {
    question: "4. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
    choices: ["undefined", "0", "prints nothing", "Syntax error"],
    correctAnswer: 0
}, {
    question: "5. What would following code return? console.log(typeof typeof 1);",
    choices: ["string", "number", "Syntax error", "undefined"],
    correctAnswer: 0
}/* ,{
        question: "6. Which software company developed JavaScript?",
    choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
    correctAnswer: 1
},{
        question: "7. What would be the result of 3+2+'7'?",
    choices: ["327", "12", "14", "57"],
    correctAnswer: 3
},{
        question: "8. Look at the following selector: $('div'). What does it select?",
    choices: ["The first div element", "The last div element", "All div elements", "Current div element"],
    correctAnswer: 2
},{
        question: "9. How can a value be appended to an array?",
    choices: ["arr(length).value;", "arr[arr.length]=value;", "arr[]=add(value);", "None of these"],
    correctAnswer: 1
},{
        question: "10. What will the code below output to the console? console.log(1 +  +'2' + '2');",
    choices: ["'32'", "'122'", "'13'", "'14'"],
    correctAnswer: 0
}*/];
var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
        var c=60;
        var t;
var modal = document.getElementById("myModal");
var btn = document.getElementById("confirm");
var iTimeShow = document.getElementById("iTimeShow");
var timer = document.getElementById("timer");
var preButton = document.querySelector(".preButton");
var nextButton = document.querySelector(".nextButton");
var quizMessage=document.querySelector('.quizMessage')
var name;
window.onload =  function() {
 modal.style.display = "block"; 
         name=document.getElementById("qname").value;
         displayCurrentQuestion();
           quizMessage.style.display ="none";
        preButton.disabled = true;
}
btn.onclick=function(){
 modal.style.display = "none";  
        timedCount();
        }       
/*  $('#myModal').on('hidden.bs.modal', function () { */
        preButton.onclick = function() {               
        if (!quizOver)
                {
                        if(currentQuestion == 0) { return false; }
       
                        if(currentQuestion == 1) {
                        preButton.disabled = true;
                        }
                                currentQuestion--; // Since we have already displayed the first question on DOM ready
                                if (currentQuestion < questions.length)
                                {
                                        displayCurrentQuestion();
                                }                                       
                } else {
                        if(viewingAns == 3) { return false; }
                        currentQuestion = 0; viewingAns = 3;
                        viewResults();         
                }
    }
        // On clicking next, display the next question
         nextButton.onclick = function() {      
                var name=document.getElementById("qname").value;
        if (!quizOver)
                {
            //var val = $("input[type='radio']:checked").val();
                if(document.querySelector("input[type='radio']:checked"))
                {
                        var val = document.querySelector("input[type='radio']:checked").value;
                }
                else{
                        var val="";
                }
            if (val == "")
                        {
                                quizMessage.innerHTML="Please select an answer";
               // $(document).find(".quizMessage").text("Please select an answer");
               quizMessage.style.display='block';
                        //$(document).find(".quizMessage").show();
            }
                        else
                        {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
               quizMessage.style.display='none';
                                if (val == questions[currentQuestion].correctAnswer)
                                {
                                        correctAnswers++;
                                }
                                else
                                {
                                        timedCount(10);
                                }
                                iSelectedAnswer[currentQuestion] = val;
                               
                                currentQuestion++; // Since we have already displayed the first question on DOM ready
                                if(currentQuestion >= 1) {
                                          preButton.disabled = false;
                                }
                                if (currentQuestion < questions.length)
                                {
                                        displayCurrentQuestion();
                                }
                                else
                                {
                                        displayScore();
                                        iTimeShow.innerHTML="Quiz Time Completed!";
                                        timer.innerHTML=name+" you scored: " + parseInt(correctAnswers)*5;
                                        c=65;
                                        preButton.textContent="View Answer";
                                                nextButton.textContent="Play Again?";
                                        //$(document).find(".nextButton").text("Play Again?");
                                        quizOver = true;
                                        return false;
                                }
                        }
                }      
                else
                { // quiz is over and clicked the next button (which now displays 'Play Again?'
                        quizOver = false;
                        iTimeShow.innerHTML='Time Remaining:';
                        iSelectedAnswer = [];
                        nextButton.textContent="Next Question";
                        preButton.textContent="Previous Question";
                        preButton.disabled=true;
                        resetQuiz();
                        viewingAns = 1;
                        displayCurrentQuestion();
                        hideScore();
                }
    }
//});
/* }); */
function timedCount(b)
        {
                var name=document.getElementById("qname").value;
                if(c == 65)
                {
                        return false;
                }
                var hours = parseInt( c / 3600 ) % 24;
                var minutes = parseInt( c / 60 ) % 60;
                var seconds = c % 60;
                var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);           
                timer.innerHTML=result;
                if(c == 0 )
                {
                                        displayScore();
                                        iTimeShow.innerHTML='Quiz Time Completed!';
                                        timer.innerHTML=name+" you  scored: " + parseInt(correctAnswers)*5;
                                        c=65;
                                        preButton.textContent="View Answer";
                                                nextButton.textContent="Play Again?";
                                        quizOver = true;
                                        return false;
                }
                /*if(c == 0 )
                {      
                        if (!quizOver)
                        {
                                var val = $("input[type='radio']:checked").val();
                 if (val == questions[currentQuestion].correctAnswer)
                                {
                                        correctAnswers++;
                                }
                                currentQuestion++; // Since we have already displayed the first question on DOM ready
                                if (currentQuestion < questions.length)
                                {
                                        displayCurrentQuestion();
                                        c=15;
                                }
                                else
                                {
                                        displayScore();
                                        $('#timer').html('');
                                        c=16;
                                        $(document).find(".nextButton").text("Play Again?");
                                        quizOver = true;
                                        return false;
                                }
                        }
                        else
                        { // quiz is over and clicked the next button (which now displays 'Play Again?'
                                quizOver = false;
                                $(document).find(".nextButton").text("Next Question");
                                resetQuiz();
                                displayCurrentQuestion();
                                hideScore();
                        }              
                }       */
        if(b!=null&&c>10)
        {
                c=c-b;
                clearTimeout(t);
        }
        else if(b!=null&&c<10)
        {
                c=0
        }
        else{
                c=c-1;
        }
                t = setTimeout(function()
                {
timedCount();
                },1000);
        }
// This displays the current question AND the choices
function displayCurrentQuestion()
{
        if(c == 65) { c = 60; timedCount(); }
    //console.log("In display current Question");
    var question = questions[currentQuestion].question;
    var questionClass = document.querySelector(".quizContainer > .question");
    var choiceList = document.querySelector(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    questionClass.textContent=question;
    // Remove all current <li> elements (if any)
   choiceList.innerHTML ="";
    var choice;
    for (i = 0; i < numChoices; i++)
        {
        choice = questions[currentQuestion].choices[i];
               
                if(iSelectedAnswer[currentQuestion] == i) {
                       
var label = document.createElement("label");
                                                var list = document.createElement("li"); 
                     var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = 'dynradio';
    radio.value = i;
    radio.checked = 'checked';
        radio.label=choice;
 
label.appendChild(radio);
label.appendChild(document.createTextNode(choice));
list.appendChild(label);
                        choiceList.appendChild(list);
                        //$('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
                } else {
                        //$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
                        var label = document.createElement("label");
                                                var list = document.createElement("li"); 
                     var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = 'dynradio';
    radio.value = i;
        radio.label=choice;
//var item = document.createTextNode("<input type='radio' class='radio-inline' value=' + i + ' name='dynradio' />" +  " " + choice );   
label.appendChild(radio);
label.appendChild(document.createTextNode(choice));
list.appendChild(label);
                       
                        choiceList.appendChild(list);
                }
    }
}

function resetQuiz()
{
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore()
{
        var name=document.getElementById("qname").value;
        document.querySelector(".quizContainer > .result").textContent=name +" you answered: " + parseInt(correctAnswers) + " correct out of: " + questions.length
 
   document.querySelector(".quizContainer > .result").style.dislay="block";
}

function hideScore()
{
    document.querySelector(".result").style.display="none";
}

// This displays the current question AND the choices
function viewResults()
{

        if(currentQuestion == 10) { currentQuestion = 0;return false; }
        if(viewingAns == 1) { return false; }

        hideScore();
    var question = questions[currentQuestion].question;
    var questionClass = document.querySelector(".quizContainer > .question");
    var choiceList = document.querySelector(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    questionClass.textContent=question;
    // Remove all current <li> elements (if any)
   choiceList.innerHTML ="";
    var choice;
        for (i = 0; i < numChoices; i++)
        {
        choice = questions[currentQuestion].choices[i];
               
                if(iSelectedAnswer[currentQuestion] == i) {
                        if(questions[currentQuestion].correctAnswer == i) {
                                var label = document.createElement("label");
                                                var list = document.createElement("li"); 
                     var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = 'dynradio';
    radio.value = i;
    radio.checked = 'checked';
        radio.label=choice;
        label.style="border:2px solid green;margin-top:10px;";
 
label.appendChild(radio);
label.appendChild(document.createTextNode(choice));
list.appendChild(label);
                       
                        choiceList.appendChild(list);
                        } else {
                                var label = document.createElement("label");
                                                var list = document.createElement("li"); 
                     var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = 'dynradio';
    radio.value = i;
    radio.checked = 'checked';
        radio.label=choice;
        label.style="border:2px solid red;margin-top:10px;";
label.appendChild(radio);
label.appendChild(document.createTextNode(choice));
list.appendChild(label);
                       
                        choiceList.appendChild(list);
                        }
                } else {
                        if(questions[currentQuestion].correctAnswer == i) {
                                var label = document.createElement("label");
                                                                var list = document.createElement("li"); 
                     var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = 'dynradio';
    radio.value = i;
        radio.label= choice;
        label.style="border:2px solid green;margin-top:10px;";
 
label.appendChild(radio);
label.appendChild(document.createTextNode(choice));
list.appendChild(label);
                       
                        choiceList.appendChild(list);

                        } else {
                                var label = document.createElement("label");
                                                var list = document.createElement("li"); 
                     var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = 'dynradio';
    radio.value = i;
        radio.label= choice;
label.appendChild(radio);
label.appendChild(document.createTextNode(choice));
list.appendChild(label);
                       
                        choiceList.appendChild(list);
                               
                        }
                }
    }
        currentQuestion++;
       
        setTimeout(function()
                {
                        viewResults();
                 },10000);
}