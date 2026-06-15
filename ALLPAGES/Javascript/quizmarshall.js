const quizData = [
    {
        question: "Qu’est-ce que le Plan Marshall ?",
        answers: [
            "Un plan militaire pour contrer l’URSS",
            "Un programme américain d’aide économique à l’Europe après la Seconde Guerre mondiale",
            "Une alliance politique entre les pays européens",
            "Une campagne de reconstruction menée par l’ONU"
        ],
        correct: 1
    },
    {
        question: "En quelle année le Plan Marshall a-t-il été lancé ?",
        answers: ["1945", "1947", "1949", "1950"],
        correct: 1
    },
    {
        question: "Quel président américain est à l’origine du Plan Marshall ?",
        answers: [
            "Harry S. Truman",
            "Dwight Eisenhower",
            "Franklin D. Roosevelt",
            "John F. Kennedy"
        ],
        correct: 0
    },
    {
        question: "Pourquoi les États-Unis ont-ils proposé le Plan Marshall ?",
        answers: [
            "Pour aider à la reconstruction de l’Europe et freiner l’expansion du communisme",
            "Pour se venger de l’Allemagne",
            "Pour coloniser les pays européens ruinés",
            "Pour s’enrichir grâce aux dettes de guerre"
        ],
        correct: 0
    },
    {
        question: "Quel secrétaire d’État américain a donné son nom au plan ?",
        answers: [
            "George Marshall",
            "James Byrnes",
            "Dean Acheson",
            "Henry Stimson"
        ],
        correct: 0
    },
    {
        question: "Quelle organisation européenne a été créée pour gérer le Plan Marshall ?",
        answers: [
            "L’OTAN",
            "L’Organisation européenne de coopération économique (OECE)",
            "Le Pacte de Varsovie",
            "La CECA"
        ],
        correct: 1
    },
    {
        question: "Combien de pays européens ont bénéficié du Plan Marshall ?",
        answers: ["8", "12", "16", "22"],
        correct: 2
    },
    {
        question: "Quel pays a refusé l’aide du Plan Marshall sous pression de l’URSS ?",
        answers: [
            "La France",
            "L’Italie",
            "La Tchécoslovaquie",
            "La Belgique"
        ],
        correct: 2
    },
    {
        question: "Quelle fut la principale conséquence du Plan Marshall ?",
        answers: [
            "La reconstruction rapide de l’Europe de l’Ouest et le renforcement du bloc occidental",
            "L’unification politique de l’Europe",
            "La chute du communisme en URSS",
            "La création de l’Union européenne"
        ],
        correct: 0
    },
    {
        question: "Quelle fut la réaction de l’URSS au Plan Marshall ?",
        answers: [
            "Elle y participa activement",
            "Elle lança le COMECON (Conseil d’assistance économique mutuelle)",
            "Elle proposa un plan concurrent appelé Truman Plan",
            "Elle resta neutre"
        ],
        correct: 1
    }
];

// Même logique de quiz réutilisable
class MarshallQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isAnswered = false;
        
        this.initializeElements();
        this.bindEvents();
        this.displayQuestion();
    }

    initializeElements() {
        this.questionNumberEl = document.getElementById('questionNumber');
        this.questionTextEl = document.getElementById('questionText');
        this.answersContainerEl = document.getElementById('answersContainer');
        this.prevBtnEl = document.getElementById('prevBtn');
        this.nextBtnEl = document.getElementById('nextBtn');
        this.progressFillEl = document.getElementById('progressFill');
        this.progressTextEl = document.getElementById('progressText');
        this.quizCardEl = document.getElementById('quizCard');
        this.resultsCardEl = document.getElementById('resultsCard');
        this.restartBtnEl = document.getElementById('restartBtn');
    }

    bindEvents() {
        this.prevBtnEl.addEventListener('click', () => this.previousQuestion());
        this.nextBtnEl.addEventListener('click', () => this.nextQuestion());
        this.restartBtnEl.addEventListener('click', () => this.restartQuiz());
    }

    displayQuestion() {
        const question = quizData[this.currentQuestion];
        this.isAnswered = false;

        this.questionNumberEl.textContent = `Question ${this.currentQuestion + 1}`;
        this.questionTextEl.textContent = question.question;

        const progress = ((this.currentQuestion + 1) / quizData.length) * 100;
        this.progressFillEl.style.width = `${progress}%`;
        this.progressTextEl.textContent = `Question ${this.currentQuestion + 1} / ${quizData.length}`;

        this.answersContainerEl.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const answerEl = this.createAnswerElement(answer, index);
            this.answersContainerEl.appendChild(answerEl);
        });

        this.prevBtnEl.disabled = this.currentQuestion === 0;
        this.nextBtnEl.disabled = true;
        this.nextBtnEl.textContent = this.currentQuestion === quizData.length - 1 ? 'Terminer' : 'Suivant';

        this.quizCardEl.style.animation = 'none';
        this.quizCardEl.offsetHeight;
        this.quizCardEl.style.animation = 'slideIn 0.5s ease';
    }

    createAnswerElement(answer, index) {
        const answerEl = document.createElement('div');
        answerEl.className = 'answer-option';
        answerEl.innerHTML = `
            <div class="answer-letter">${String.fromCharCode(65 + index)}</div>
            <div class="answer-text">${answer}</div>
        `;
        answerEl.addEventListener('click', () => this.selectAnswer(index, answerEl));
        return answerEl;
    }

    selectAnswer(selectedIndex, selectedEl) {
        if (this.isAnswered) return;
        document.querySelectorAll('.answer-option').forEach(el => el.classList.remove('selected'));
        selectedEl.classList.add('selected');
        this.userAnswers[this.currentQuestion] = selectedIndex;
        this.isAnswered = true;
        this.nextBtnEl.disabled = false;
        setTimeout(() => this.showAnswerFeedback(), 400);
    }

    showAnswerFeedback() {
        const question = quizData[this.currentQuestion];
        const userAnswer = this.userAnswers[this.currentQuestion];
        const correctAnswer = question.correct;
        document.querySelectorAll('.answer-option').forEach((el, index) => {
            if (index === correctAnswer) el.classList.add('correct');
            else if (index === userAnswer && userAnswer !== correctAnswer) el.classList.add('incorrect');
        });
        if (userAnswer === correctAnswer) this.score++;
    }

    nextQuestion() {
        if (this.currentQuestion < quizData.length - 1) this.currentQuestion++;
        else return this.showResults();
        this.displayQuestion();
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
        }
    }

    showResults() {
        this.quizCardEl.classList.add('hidden');
        this.resultsCardEl.classList.remove('hidden');
        const percentage = Math.round((this.score / quizData.length) * 100);
        document.getElementById('scoreNumber').textContent = this.score;
        document.getElementById('percentageScore').textContent = `${percentage}%`;

        const resultsMessage = document.getElementById('resultsMessage');
        if (percentage >= 90) resultsMessage.textContent = "Excellent ! Vous connaissez parfaitement le Plan Marshall.";
        else if (percentage >= 70) resultsMessage.textContent = "Très bien ! Vos connaissances sont solides.";
        else if (percentage >= 50) resultsMessage.textContent = "Pas mal ! Quelques points à revoir.";
        else resultsMessage.textContent = "Il serait bon de réviser davantage le Plan Marshall.";
    }

    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isAnswered = false;
        this.resultsCardEl.classList.add('hidden');
        this.quizCardEl.classList.remove('hidden');
        this.displayQuestion();
    }
}

document.addEventListener('DOMContentLoaded', () => new MarshallQuiz());
