const quizData = [
    {
        question: "Quand a commencé l’occupation américaine en Haïti ?",
        answers: ["1910", "1915", "1920", "1930"],
        correct: 1
    },
    {
        question: "Quelle fut la principale cause de l’occupation américaine ?",
        answers: [
            "La découverte de pétrole",
            "La peur de l’instabilité politique et la protection des intérêts américains",
            "La conquête militaire classique",
            "La demande de la Société des Nations"
        ],
        correct: 1
    },
    {
        question: "Quel président haïtien était en fonction lors du début de l’occupation ?",
        answers: [
            "Sténio Vincent",
            "Philippe Sudré Dartiguenave",
            "Louis Borno",
            "Élie Lescot"
        ],
        correct: 1
    },
    {
        question: "Quel corps américain fut chargé de l’occupation ?",
        answers: [
            "La Marine américaine (US Navy)",
            "L’Armée de terre américaine",
            "La Garde nationale",
            "Les Marines volontaires"
        ],
        correct: 0
    },
    {
        question: "Quel impact économique majeur eut l’occupation ?",
        answers: [
            "La Haïti devint un leader industriel en Amérique",
            "Les Américains contrôlèrent les finances et les douanes",
            "La monnaie haïtienne fut entièrement remplacée par le dollar",
            "Les plantations locales furent distribuées gratuitement aux paysans"
        ],
        correct: 1
    },
    {
        question: "Comment l’occupation a-t-elle affecté la souveraineté haïtienne ?",
        answers: [
            "Les Haïtiens conservèrent un contrôle total sur leur armée",
            "Le pays perdit une partie de son autonomie politique",
            "Le président pouvait décider librement de toutes les lois",
            "La justice resta entièrement indépendante"
        ],
        correct: 1
    },
    {
        question: "Quelle révolte célèbre s’opposa à l’occupation ?",
        answers: [
            "La révolte des Cacos",
            "La révolution de 1910",
            "Le soulèvement de Port-au-Prince",
            "Le mouvement de 1934"
        ],
        correct: 0
    },
    {
        question: "Quand prit fin officiellement l’occupation américaine ?",
        answers: ["1930", "1934", "1940", "1945"],
        correct: 1
    },
    {
        question: "Quelle fut une conséquence sociale importante de l’occupation ?",
        answers: [
            "Une amélioration immédiate des conditions de vie pour tous",
            "Une militarisation de la société et des tensions avec les paysans",
            "Une totale égalité entre les classes sociales",
            "Une émigration massive vers les États-Unis"
        ],
        correct: 1
    },
    {
        question: "Comment l’occupation américaine est-elle perçue dans l’histoire haïtienne ?",
        answers: [
            "Comme un épisode de modernisation et de stabilité",
            "Comme un moment de résistance et de perte de souveraineté",
            "Comme une période insignifiante",
            "Comme une réussite totale des institutions locales"
        ],
        correct: 1
    }
];

// Même logique de quiz réutilisable
class HaitiOccupationQuiz {
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
        if (percentage >= 90) resultsMessage.textContent = "Excellent ! Vous maîtrisez parfaitement l’occupation américaine en Haïti.";
        else if (percentage >= 70) resultsMessage.textContent = "Très bien ! Vos connaissances sont solides.";
        else if (percentage >= 50) resultsMessage.textContent = "Pas mal ! Quelques points à revoir.";
        else resultsMessage.textContent = "Il serait bon de réviser davantage l’occupation américaine en Haïti.";
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

document.addEventListener('DOMContentLoaded', () => new HaitiOccupationQuiz());
