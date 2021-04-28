'use strict'

const URL_API = 'https://opentdb.com/api.php?amount=';
const QUERY_STRING = window.location.href;
const PARAMS = new URLSearchParams(QUERY_STRING);

let questions = [];
let count = 0;
let AMOUNT = 5;
let CATEGORY = -1;
let DIFFICULT = -1;
let TYPE = 'multiple';
let userScore = 0;
let answers = [];
let answersCountInterface = 1;
let i = 0;

function getParams () {
    AMOUNT = PARAMS.get('amount');
    CATEGORY = PARAMS.get('category');
    DIFFICULT = PARAMS.get('difficult');
    TYPE = PARAMS.get('type');       
}

function getQuestions () {
    fetch(`https://opentdb.com/api.php?amount=${AMOUNT}&category=${CATEGORY}&difficulty=${DIFFICULT}&type=${TYPE}`)
        .then(response => response.json())
        .then(result => saveQuestions(result.results))        
}

/* === FUNCION QUE RECIBE RESULTADO DEL FETCH === */
function saveQuestions (result) {    
    result.forEach((question)=>{
        questions.push(question);   
    })   
   
    result.forEach((answer) => answers.push(answer.correct_answer))

    // Verificamos que tipo de pregunta es: Boolean or Multiple
    
    if (questions[0].type === 'multiple'){
        printMultipleQuestions()        
    } else {        
        printBooleanQuestions()
    }
}

function printMultipleQuestions () {
    const container = document.getElementById('game-container');
    let randomAnswers = getRandomAnswers([
        questions[count].incorrect_answers[0], 
        questions[count].incorrect_answers[1], 
        questions[count].incorrect_answers[2],
        questions[count].correct_answer
]);

    randomAnswers = getRandomAnswers(randomAnswers)
    container.innerHTML = `
    <h1 class="title mb-5">Quiz it</h1>
    <p>${answers.length}/${answersCountInterface}</p>
    <h3 class="title-question" id="title-question">${questions[count].question}</h3>
        <div class="container-question mt-4">
            <h1 class="title-option">A</h1>
            <div class="container-answer" id="container-answer1" onclick="multipleAnswerChooiced(answer1), printNextMultipleQuestion()">
                <p class="answer-text" id='answer1'>${randomAnswers[0]}</p>
            </div>
        </div>
        <div class="container-question d-flex">
            <h1 class="title-option">B</h1>
            <div class="container-answer" id="container-answer2" onclick="multipleAnswerChooiced(answer2), printNextMultipleQuestion()">
                <p class="answer-text" id='answer2'>${randomAnswers[1]}</p>
            </div>


        </div>
        <div class="container-question d-flex">
            <h1 class="title-option">C</h1>
            <div class="container-answer" id="container-answer3" onclick="multipleAnswerChooiced(answer3), printNextMultipleQuestion()">
                <p class="answer-text" id='answer3'>${randomAnswers[2]}</p>
            </div>
            
        </div>
        <div class="container-question">
            <h1 class="title-option">D</h1>
            <div class="container-answer" id="container-answer4" onclick="multipleAnswerChooiced(answer4), printNextMultipleQuestion()">
                <p class="answer-text" id='answer4'>${randomAnswers[3]}</p>
            </div>            
        </div>
        <button type="button" class="btn btn-primary mt-3" onclick="printNextMultipleQuestion()">Next Question</button>`
        countQuestions()
}

function printBooleanQuestions () {
    const container = document.getElementById('game-container');
    container.innerHTML = `
    <h1 class="title mb-5">Quiz it</h1>
    <p>${answers.length}/${answersCountInterface}</p>
    <h3 class="title-question" id="title-question">${questions[count].question}</h3>
        <div class="container-question mt-4" id="container-question1">
            <h1 class="title-option">A</h1>
            <div class="container-answer" id="container-answer1" onclick="booleanAnswerChooiced(answer1), printNextBooleanQuestion()">
                <p class="answer-text" id='answer1'>True</p>
            </div>
        </div>
        <div class="container-question d-flex" id="container-question2">
            <h1 class="title-option">B</h1>
            <div class="container-answer" id="container-answer2" onclick="booleanAnswerChooiced(answer2), printNextBooleanQuestion()">
                <p class="answer-text" id='answer2'>False</p>
            </div>
        </div>
        <button type="button" class="btn btn-primary mt-3" onclick="printNextBooleanQuestion()">Next Question</button>`
       
        countQuestions()
}

function countQuestions () {
    count++
}

function printNextMultipleQuestion () {     

    if (count <= questions.length-1) {
        setTimeout(()=>{
            printMultipleQuestions() 
        }, 2000)   
        answersCountInterface++
    } else {              
        setTimeout(()=>{
            showResults()
        }, 2000)
    }        
}

function printNextBooleanQuestion () {
    if (count <= questions.length-1) {
        setTimeout(()=>{
            printBooleanQuestions()    
        }, 2000)
        answersCountInterface++
    } else {  
        setTimeout(()=>{
            showResults()
        }, 2000)
    }
}   

function multipleAnswerChooiced (id) {
   
    let correctAnswer = document.getElementById(id.id)
    if(id.textContent === answers[i]){       
        correctAnswer.parentNode.classList.add('answer-bg-correct')
        addUserScore();        
        i++
        return true
    } else {       
        correctAnswer.parentNode.classList.add('answer-bg-incorrect')
        i++
        return false
    }
       
}

function booleanAnswerChooiced (id) {

    let correctAnswer = document.getElementById(id.id)
    
    if(id.textContent === answers[i]){       
        correctAnswer.parentNode.classList.add('answer-bg-correct')
        addUserScore();        
        i++
        return true;
    } else {      
        correctAnswer.parentNode.classList.add('answer-bg-incorrect')
        i++
        return false;
    }
    
}

function addUserScore () {
    userScore+=10
}
       
function getRandomAnswers (answers) {    
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }       
        return answers
}

function showResults () {
    const container = document.getElementById('game-container');
    container.innerHTML = `
    <h1>GAME OVER</h1>
    <h3>Your Score: ${userScore}pts</h3>
    <a href="./index.html"class="btn btn-primary mt-5">Try Again?</a>
    `
}

getParams()
getQuestions()
