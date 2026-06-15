const quizData = [
    {
        question: "Quelle a été la principale conséquence économique de la Première Guerre mondiale pour les États-Unis ?",
        answers: [
            "Une ruine financière complète",
            "Un endettement massif auprès de l’Europe",
            "Un enrichissement et une position de créancier mondial",
            "Une dépendance économique envers l’Europe"
        ],
        correct: 2
    },
    {
        question: "Quel rôle économique les États-Unis ont-ils joué après la Première Guerre mondiale ?",
        answers: [
            "Ils ont importé massivement depuis l’Europe",
            "Ils sont devenus les principaux exportateurs et banquiers du monde",
            "Ils ont cessé tout commerce international",
            "Ils ont rejoint la Société des Nations"
        ],
        correct: 1
    },
    {
        question: "Quelle industrie américaine s’est particulièrement développée après la Grande Guerre ?",
        answers: [
            "L’industrie automobile et pétrolière",
            "L’industrie textile",
            "L’industrie du jouet",
            "L’industrie agricole uniquement"
        ],
        correct: 0
    },
    {
        question: "Pourquoi parle-t-on d’une 'américanisation' du monde dans les années 1920 ?",
        answers: [
            "Parce que les États-Unis ont imposé leur culture, leur mode de vie et leurs produits",
            "Parce qu’ils ont annexé plusieurs pays",
            "Parce qu’ils ont colonisé l’Afrique",
            "Parce qu’ils ont imposé une langue mondiale"
        ],
        correct: 0
    },
    {
        question: "Quel symbole illustre la domination culturelle américaine dans les années 1920 ?",
        answers: [
            "Le cinéma hollywoodien",
            "Les musées européens",
            "Les châteaux français",
            "Les romans russes"
        ],
        correct: 0
    },
    {
        question: "Quel fut le principal instrument de la puissance financière américaine ?",
        answers: [
            "La Banque mondiale",
            "La Bourse de New York et les banques privées américaines",
            "Le FMI",
            "Le commerce du coton"
        ],
        correct: 1
    },
    {
        question: "Quelle crise mit fin à la domination économique américaine des années 1920 ?",
        answers: [
            "La crise de 1929",
            "La guerre du Vietnam",
            "La Seconde Guerre mondiale",
            "Le krach de Londres en 1935"
        ],
        correct: 0
    },
    {
        question: "Quelle fut l’attitude politique des États-Unis après la Grande Guerre ?",
        answers: [
            "Ils se sont engagés dans la Société des Nations",
            "Ils se sont repliés sur eux-mêmes avec une politique isolationniste",
            "Ils ont envahi l’Europe",
            "Ils ont formé une alliance avec la Russie"
        ],
        correct: 1
    },
    {
        question: "Comment les États-Unis ont-ils exercé leur influence sur l’Amérique latine ?",
        answers: [
            "Par des interventions militaires et un contrôle économique indirect",
            "Par la colonisation directe",
            "Par l’annexion de tous les pays voisins",
            "Par des mariages royaux"
        ],
        correct: 0
    },
    {
        question: "Quelle expression résume le rôle mondial des États-Unis après 1918 ?",
        answers: [
            "Les États-Unis, 'banquiers du monde'",
            "Les États-Unis, 'puissance en déclin'",
            "Les États-Unis, 'empire agricole'",
            "Les États-Unis, 'neutres et isolés'"
        ],
        correct: 0
    }
];

class USADominationQuiz {
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
        if (percentage >= 90) resultsMessage.textContent = "Excellent ! Vous maîtrisez très bien la domination américaine après la Grande Guerre.";
        else if (percentage >= 70) resultsMessage.textContent = "Très bien ! Vous connaissez bien le rôle mondial des États-Unis.";
        else if (percentage >= 50) resultsMessage.textContent = "Pas mal ! Il reste quelques points à approfondir.";
        else resultsMessage.textContent = "Revois les bases de la montée en puissance américaine après 1918.";
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

document.addEventListener('DOMContentLoaded', () => new USADominationQuiz());
