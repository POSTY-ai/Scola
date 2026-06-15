const quizData = [
    {
        question: "Quel traité a fondé l’Union européenne sous sa forme actuelle ?",
        answers: [
            "Le Traité de Rome (1957)",
            "Le Traité de Maastricht (1992)",
            "Le Traité de Lisbonne (2007)",
            "Le Traité de Paris (1951)"
        ],
        correct: 1
    },
    {
        question: "Quel est l’un des principaux objectifs de l’Union européenne dans le monde ?",
        answers: [
            "Favoriser les échanges commerciaux et la coopération internationale",
            "Imposer sa culture à d'autres régions",
            "Créer une armée mondiale",
            "Remplacer l’ONU"
        ],
        correct: 0
    },
    {
        question: "Quel domaine reflète le mieux la puissance économique de l’Union européenne ?",
        answers: [
            "L’agriculture",
            "L’industrie automobile et les technologies vertes",
            "Les sports",
            "L’armement"
        ],
        correct: 1
    },
    {
        question: "Quel rôle joue l’Union européenne dans les relations internationales ?",
        answers: [
            "Elle agit comme une puissance diplomatique et économique majeure",
            "Elle reste neutre dans toutes les affaires mondiales",
            "Elle dépend totalement des États-Unis pour sa politique étrangère",
            "Elle intervient uniquement en Europe"
        ],
        correct: 0
    },
    {
        question: "Quelle est la monnaie commune de la majorité des pays de l’Union européenne ?",
        answers: [
            "Le dollar européen",
            "Le franc européen",
            "L’euro",
            "La livre européenne"
        ],
        correct: 2
    },
    {
        question: "Comment l’Union européenne influence-t-elle les pays en développement ?",
        answers: [
            "Par des accords commerciaux, des aides financières et des programmes de coopération",
            "Par des occupations militaires",
            "Par la diffusion du cinéma européen",
            "Par des sanctions uniquement"
        ],
        correct: 0
    },
    {
        question: "Quel type de puissance représente principalement l’Union européenne ?",
        answers: [
            "Une puissance militaire",
            "Une puissance culturelle",
            "Une puissance douce (soft power)",
            "Une puissance religieuse"
        ],
        correct: 2
    },
    {
        question: "Quelle institution gère la politique étrangère de l’Union européenne ?",
        answers: [
            "La Commission européenne",
            "Le Parlement européen",
            "Le Conseil européen",
            "Le Haut représentant pour les affaires étrangères et la politique de sécurité"
        ],
        correct: 3
    },
    {
        question: "Comment l’Union européenne promeut-elle ses valeurs dans le monde ?",
        answers: [
            "En soutenant la démocratie, les droits de l’homme et le développement durable",
            "En imposant ses lois aux autres pays",
            "En limitant les échanges internationaux",
            "En se retirant des organisations mondiales"
        ],
        correct: 0
    },
    {
        question: "Quelle phrase résume le rôle mondial de l’Union européenne ?",
        answers: [
            "Une puissance économique et diplomatique influente, mais non militaire",
            "Une puissance militaire dominante",
            "Une organisation isolée du reste du monde",
            "Une union sans influence internationale"
        ],
        correct: 0
    }
];

class UEWorldQuiz {
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
        if (percentage >= 90) resultsMessage.textContent = "Excellent ! Vous comprenez parfaitement le rôle mondial de l’Union européenne.";
        else if (percentage >= 70) resultsMessage.textContent = "Très bien ! Vous maîtrisez les grandes lignes de l’influence européenne.";
        else if (percentage >= 50) resultsMessage.textContent = "Pas mal ! Continuez à explorer les enjeux mondiaux de l’Union européenne.";
        else resultsMessage.textContent = "Revois les bases de la puissance et de l’influence mondiale de l’Union européenne.";
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

document.addEventListener('DOMContentLoaded', () => new UEWorldQuiz());
