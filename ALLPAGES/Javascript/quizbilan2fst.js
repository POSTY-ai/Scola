const quizData = [
    {
        question: "En quelle année la Seconde Guerre mondiale a-t-elle pris fin ?",
        answers: ["1943", "1944", "1945", "1946"],
        correct: 2
    },
    {
        question: "Combien de morts environ la Seconde Guerre mondiale a-t-elle causé ?",
        answers: [
            "Environ 10 millions",
            "Environ 25 millions",
            "Environ 40 millions",
            "Environ 60 millions"
        ],
        correct: 3
    },
    {
        question: "Quel pays a subi le plus de pertes humaines durant la guerre ?",
        answers: [
            "Les États-Unis",
            "L’Union soviétique",
            "La France",
            "Le Japon"
        ],
        correct: 1
    },
    {
        question: "Quelle organisation internationale fut créée après la guerre pour maintenir la paix ?",
        answers: [
            "La Société des Nations (SDN)",
            "Le Pacte de Varsovie",
            "L’Organisation des Nations Unies (ONU)",
            "L’OTAN"
        ],
        correct: 2
    },
    {
        question: "Quel événement marque la fin de la guerre dans le Pacifique ?",
        answers: [
            "La bataille de Stalingrad",
            "Le débarquement de Normandie",
            "Les bombardements atomiques d’Hiroshima et Nagasaki",
            "L’assassinat de Mussolini"
        ],
        correct: 2
    },
    {
        question: "Quel grand procès a jugé les responsables nazis après la guerre ?",
        answers: [
            "Le procès de Berlin",
            "Le procès de Nuremberg",
            "Le procès de Munich",
            "Le procès de Genève"
        ],
        correct: 1
    },
    {
        question: "Quelle division politique du monde est apparue après la guerre ?",
        answers: [
            "La division entre Nord et Sud",
            "La division entre Est et Ouest pendant la guerre froide",
            "La division entre riches et pauvres",
            "La division entre monarchies et républiques"
        ],
        correct: 1
    },
    {
        question: "Quel pays est devenu une superpuissance mondiale avec les États-Unis après 1945 ?",
        answers: [
            "La Chine",
            "La France",
            "L’Union soviétique (URSS)",
            "Le Royaume-Uni"
        ],
        correct: 2
    },
    {
        question: "Quel fut l’un des impacts économiques majeurs de la guerre ?",
        answers: [
            "La reconstruction de l’Europe grâce au Plan Marshall",
            "L’effondrement économique des États-Unis",
            "La disparition du commerce international",
            "L’abolition du capitalisme en Europe"
        ],
        correct: 0
    },
    {
        question: "Quelle conséquence sociale importante la guerre a-t-elle provoquée ?",
        answers: [
            "Un recul du travail féminin",
            "Un renforcement du rôle des femmes et des mouvements de décolonisation",
            "Une disparition des réfugiés en Europe",
            "Un retour immédiat à la prospérité"
        ],
        correct: 1
    }
];

// Même logique de quiz réutilisable
class WWIIQuiz {
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
        if (percentage >= 90) resultsMessage.textContent = "Excellent ! Vous maîtrisez parfaitement le bilan de la Seconde Guerre mondiale.";
        else if (percentage >= 70) resultsMessage.textContent = "Très bien ! Vos connaissances sont solides.";
        else if (percentage >= 50) resultsMessage.textContent = "Pas mal ! Vous avez une bonne base, mais quelques points à revoir.";
        else resultsMessage.textContent = "Il serait bon de réviser davantage le bilan de la Seconde Guerre mondiale.";
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

document.addEventListener('DOMContentLoaded', () => new WWIIQuiz());
