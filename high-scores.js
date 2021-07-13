var highscores = [];
var score = localStorage.getItem('currentScore');
document.getElementById('current-score').innerHTML = score;
function submitHighScore(){
    var usersInit = document.getElementById('score-entry').value;
 
   highscores = localStorage.getItem('scores');
   if(highscores != null){
       highscores = JSON.parse(highscores);
   }else{
       highscores = [];
   }
   highscores.push({name:usersInit, score});
   highscores.sort((a, b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1: 0));
   localStorage.setItem('scores', JSON.stringify(highscores));
   displayHighScores();
}

function displayHighScores(){
    var html = "<h1> High Sores </h1>";
    for(var i = 0; i < highscores.length; i++){
        html += `<div>${i + 1}. ${highscores[i].name} ${highscores[i].score }</div>`;
    }

    html+=`<button type="button" class="btn" onclick="goBack()">Go Back</button> <button type="button" class="btn" onclick="clearHighScores()">Clear High Scores</button>`;

    document.getElementById('results').innerHTML = html;
}

function goBack (){
    window.location.href='/';
}

function clearHighScores(){
    localStorage.removeItem('scores');
    highscores = [];
    displayHighScores();
}