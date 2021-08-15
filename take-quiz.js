var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.ans-text'));
var trackingText = document.querySelector('#trackingText');
var scoreText = document.querySelector('#score');
var fullTrackBar = document.querySelector('#fullTrackBar');

var atQuestion = {};
var isAnswer = true;
var score = 0;
var questionCount = 0;
var nowQuizItems =[];

var quizItems = [
    { 
        question: 'What is the meaning of CSS?',
        arrayAnswers:['Computer Selection Standards',
         'Cascading Style Sheets',
        'Computational Statistical Search',
        'Computer Standardized Styles' ],
        realAns: 1,
    },
    { 
        question: 'How does JavaScript differ from Java?',
         arrayAnswers:['It does not.',
         'JavaScript is shorthand for coffee drinks.',
         'Java is shorthand for REAL coffee drinks.',
         'JavaScript provides client-side interactivity to websites.'],
        realAns: 3,
    },
    { 
        question: 'What is the purpose of pi?',
         arrayAnswers:['It is useless.',
         'pi = 3.141 ...',
         'pi is an uninformed way of describing a piece of pizza ',
         'pi is a natural constant; it is the ratio of circumference to diameter.'],
        realAns: 3,
    },
    { 
        question: 'What is the floor of 17.99873?',
        arrayAnswers:[ '17',
         '18',
         'Cannot determine from the information given.',
         'A very pleasant place to host a desk.'],
        realAns: 0,
    },
    { 
        question: 'How many mandolin players know "Blowing in the Wind" by Bob Dylan?',
        arrayAnswers:['none',
         'everyone',
         'most ',
         'all who know anything'],
        realAns: 3,
    }
]

var scorePoints = 5;
var maxQuestions = 5;
var curQuestIdx = 0;
var currentScore = 0;
var startTime = 75;
var TIME_PENALTY = 2;

startTest = () => {
    // questionCount = 0;
    // score = 0;
    // nowQuizItems = [... quizItems];    
    var timer = setInterval(function (){ 
        startTime--;
        document.getElementById('timer').innerHTML = startTime; 
        if(startTime<0){
            clearInterval(timer);
            document.getElementById('timer').innerHTML = 'Expired';
        }
    }, 1000);
}

function submitAnswer(k){
    var isCorrect = quizItems[curQuestIdx].realAns == k;
    if(isCorrect){ 
        currentScore++;
        document.getElementById("score").innerHTML = currentScore;
        document.getElementById(`answer-${k}`).classList.add("right");
    }else{
        startTime -= TIME_PENALTY;
        document.getElementById(`answer-${k}`).classList.add("wrong");
    }
    curQuestIdx++;
    var trackBarWidth = (curQuestIdx/quizItems.length)*20;
    var widthStyle = 'width: ' + trackBarWidth + 'rem';
    document.getElementById('fullTrackBar').setAttribute("style", widthStyle);
    if(curQuestIdx < quizItems.length){
        setTimeout(function(){
            loadQuizQuestions(curQuestIdx);
        }, 500);        
    }else{
        localStorage.setItem('currentScore', currentScore);
        window.location.href='/highscores.html';
    }
}

function loadQuizQuestions (k){
    
    var quizHtml = `<h2 id="question">${quizItems[k].question}</h2>`;
    for (var i=0; i < quizItems[k].arrayAnswers.length; i++){

        quizHtml +=`<div id="answer-${i}" class="ans-choices" onclick="submitAnswer(${i})">
                <p class="ans-label">${i+1}</p>
                <p class="ans-text" data-item="1">${quizItems[k].arrayAnswers[i]}</p>
            </div>`;

    }
    document.getElementById('quiz-questions').innerHTML = quizHtml;          
}
startTest();
loadQuizQuestions (curQuestIdx);

// getNewQuestion = () => {
// //     if(nowQuizItems.length === 0 || questionsCount > max_questions)
// // }