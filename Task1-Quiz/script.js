const questions = [
    {
        question: "what is java script?",
        answers: [
            { text: "platform", correct: false },
            { text: "programming language", correct: true },
            { text: "Error", corect: false },
            { text: "exception", correct: false }
        ]
    },
    {
        question: "Inside which html element do we put the javascript",
        answers: [
            { text: "javascript"  , correct: false },
            { text: "script", correct: true },
            { text: "js", correct: false },
            { text: "html", correct: false }
        ]
    },
    {
        question: "The function and var are known as?",
        answers: [
            { text: "keywords", correct: false },
            { text: "data types", correct: true },
            { text: "declaration statements", correct: false },
            { text: "prototypes", correct: false }
        ]
    },
    {
        question: "which of the following is ternary  operator",
        answers: [
            { text: ":", correct: false },
            { text: "?", correct: true },
            { text: "-", correct: false },
            { text: "+", correct: false }
        ]
    },
    {
        question: "which of the following is ternary  operator",
        answers: [
            { text: ":", correct: false },
            { text: "?", correct: true },
            { text: "-", correct: false },
            { text: "+", correct: false }
        ]
    },
    {
        question: "What is the output of console.log(typeof null);?",
        answers: [
            { text: "object", correct: true },
            { text: "null", correct: false },
            { text: "undefined", correct: false },
            { text: "boolean", correct: false }
        ]

    },
      {
        question: "Which method is used to parse a string and return an integer in JavaScript?",
        answers: [
            {text: "parseInt()",correct: true},
            {text: "parseFloat()",correct: false},
            {text: "Number()",correct: false},
            {text: "String()",correct:false}
        ]
        
    },
    {
        question: "What is the result of the following code: 2 + '2'?",
        answers: [
            {text:"4",correct: false},
            {text: "22",correct: true},
            {text: "NaN",correct:false},
            {text: "undefined",correct:false}
        ]
    
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            {text:"function myFunction() {}",correct:true},
            {text: "create function myFunction() {}",correct:false},
            {text: "def myFunction() {}",correct:false},
            {text: "func myFunction() {}",correct:false}
        ]
        
    },
    // {
    //     question: "Which of the following is a valid way to declare a variable in JavaScript?",
    //     options: ["var myVar;", "variable myVar;", "v myVar;", "myVar := 0;"],
    //     answer: "var myVar;"
    // },
    // {
    //     question: "What is the result of the expression 0 == '0'?",
    //     options: ["true", "false", "undefined", "NaN"],
    //     answer: "true"
    // },
    // {
    //     question: "Which keyword is used to create a new object in JavaScript?",
    //     options: ["new", "create", "make", "object"],
    //     answer: "new"
    // },
    // {
    //     question: "What will console.log([] == ![]) output?",
    //     options: ["true", "false", "undefined", "null"],
    //     answer: "true"
    // },
    // {
    //     question: "What does JSON.stringify() do?",
    //     options: ["Converts a JavaScript object to a JSON string", "Parses a JSON string into a JavaScript object", "Converts a JSON string to a JavaScript object", "None of the above"],
    //     answer: "Converts a JavaScript object to a JSON string"
    // },
    // {
    //     question: "How can you add a comment in JavaScript?",
    //     options: ["// This is a comment", "# This is a comment", "/* This is a comment */", "<!-- This is a comment -->"],
    //     answer: "// This is a comment"
    // }
];


const questionElement = document.querySelector("#questions");
const answerButtons = document.querySelector(".btn");
const nextBtn = document.querySelector('#next-btn');
const finishButton=document.querySelector("#finish-btn");
const attempted=document.querySelector('.attempted-text');
const incorrect=document.querySelector('.wrong-text');
const hateAnswers=document.querySelector('.hate-text');



let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft= 60;

let attemptedQuestions=0;
let incorrectAnswers=0;
let totalhateAnswers=0;

function startTimer() {
    let  time=document.getElementById('timer')
    time.style.display = "block";
    time.style.color="#0e1a1add"
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('next-btn').click();
        }
       time.innerHTML = `Time Remaining  : ${timeLeft}`;
    }    ,1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 60;
    document.getElementById('timer').innerText = timeLeft;
    // startTimer();
    
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    attemptedQuestions=0;
    incorrectAnswers=0;
    totalhateAnswers=0;
    nextBtn.innerHTML = "Next";
    incorrect.style.display = 'none';
    attempted.style.display = 'none';
    hateAnswers.style.display = 'none';
     showQuestion();
    startTimer();    
}

function showQuestion() {
    resetState();
    attemptedQuestions++;
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    startTimer();
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("li")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)

    });
    resetTimer()
    

}

function resetState() {
    nextBtn.style.display = "block";
    finishButton.style.display='none';
    while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        
        score++;
    }
    else {
        incorrectAnswers++;
        totalhateAnswers++;
        let w=selectedBtn.classList.add("incorrect");
        w.style.color="red";
    }

    Array.from(answerButtons.children).forEach(li => {
        if (li.dataset.correct === "true") {
            li.classList.add("correct");
        }
        li.disabled = true;
    })
    nextBtn.style.display = "block"
}

startQuiz();

function showScore() {
    resetState();
    negativeScore = score - (totalhateAnswers/2);
    hateAnswers.style.display='block';

    hateAnswers.innerHTML = `Correct Answers: ${score}`;
    questionElement.innerHTML = `you scored ${negativeScore} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
    finishButton.innerText='Finish';
    finishButton.style.display='block';
    // finishBtn();
    attempted.style.display = 'block';
    attempted.innerHTML = `Attempted Questions : ${attemptedQuestions}`;
    console.log(attemptedQuestions);
    incorrect.style.display = 'block';
    incorrect.innerHTML=`Wrong Answers: ${incorrectAnswers}`
    document.getElementById('timer').style.display = "none";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }if(currentQuestionIndex>9)
   {  
     document.getElementById('next-btn').innerText="Finish";

    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
        resetTimer();
    }
})

function finishBtn(){
    console.log('finish');
    finishButton.style.backgroundcolor = '#001e4d';
    finishButton.style.color = '#fff';
    finishButton.addEventListner('click',() =>{
        nextBtn.style.display = "none";
    })

}