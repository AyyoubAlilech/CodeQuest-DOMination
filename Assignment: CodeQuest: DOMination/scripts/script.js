const questions = [
    {
        question: "What is the correct syntax to declare a variable in JavaScript?",
        answer: [
            {text: "let myVariable;", correct: true},
            {text: "let = myVariable;", correct: false},
            {text: "let my variable;", correct: false},
            {text: "myVariable let;", correct: false},
        ]
    },
    {
        question: "Which array method adds an element to the end of an array?",
        answer: [
            {text: "push()", correct: true},
            {text: "pop()", correct: false},
            {text: "shift()", correct: false},
            {text: "unshift()", correct: false},
        ]
    },
    {
        question: "How do you write a conditional statement in JavaScript?",
        answer: [
            {text: "if (condition) {}", correct: true},
            {text: "if condition {}", correct: false},
            {text: "if condition then {}", correct: false},
            {text: "if (condition)", correct: false},
        ]
    },
    {
        question: "which loop will execute at least once even if the condition is false?",
        answer: [
            {text: "for loop", correct: false},
            {text: "while loop", correct: false},
            {text: "do … while loop", correct: true},
            {text: "foreach loop", correct: false},
        ]
    },
    {
        question: "How do you create an array in JavaScript?",
        answer: [
            {text: "let arr = <>;", correct: false},
            {text: "let arr = {};", correct: false},
            {text: "let arr = ();", correct: false},
            {text: "let arr = [];", correct: true},
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextQuestionButton = document.getElementById("next-btn");
const titleElement = document.getElementById("title");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    titleElement.style.display = "block";
    nextQuestionButton.innerHTML = "Next Question";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); 
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    if (currentQuestionIndex === questions.length - 1) {
        nextQuestionButton.innerHTML = "Show Result";
    } else {
        nextQuestionButton.innerHTML = "Next Question";
    }
}



function resetState(){
    nextQuestionButton.style.display = "block"; 
    nextQuestionButton.disabled = true;         
    nextQuestionButton.classList.add("disabled"); 

    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{ 
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; 
    });

    nextQuestionButton.disabled = false;             
    nextQuestionButton.classList.remove("disabled"); 
}


function showScore(){
    resetState();
    titleElement.style.display = "none";
    questionElement.innerHTML = `<span class="score-text">Your Score :<br><br></span> ${score} out of ${questions.length}!`;
    nextQuestionButton.innerHTML = "Restart Quiz";
    nextQuestionButton.disabled = false;
    nextQuestionButton.classList.remove("disabled");
}




function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}


nextQuestionButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
});

startQuiz();

