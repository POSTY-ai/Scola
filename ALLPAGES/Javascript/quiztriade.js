const quizData = [
    {
        question: "Qu’est-ce que la Triade dans l’économie mondiale ?",
        answers: [
            "Trois blocs politiques opposés pendant la guerre froide",
            "Les trois grandes puissances économiques dominantes : États-Unis, Union européenne et Japon",
            "Trois organisations internationales de commerce",
            "Trois continents en voie de développement"
        ],
        correct: 1
    },
    {
        question: "Quels sont les trois pôles principaux de la Triade ?",
        answers: [
            "États-Unis, Union européenne, Japon",
            "Chine, Inde, Brésil",
            "Canada, Mexique, Australie",
            "Russie, Afrique du Sud, Argentine"
        ],
        correct: 0
    },
    {
        question: "Quel rôle joue la Triade dans le commerce mondial ?",
        answers: [
            "Elle concentre la majorité des échanges commerciaux et des investissements mondiaux",
            "Elle limite les échanges mondiaux",
            "Elle interdit les exportations vers les pays pauvres",
            "Elle favorise uniquement le commerce local"
        ],
        correct: 0
    },
    {
        question: "Quel secteur économique est le plus développé au sein de la Triade ?",
        answers: [
            "Le secteur tertiaire (services, finance, technologies)",
            "Le secteur primaire (agriculture, pêche, mines)",
            "Le secteur militaire uniquement",
            "L’artisanat traditionnel"
        ],
        correct: 0
    },
    {
        question: "Quelle institution financière mondiale a été fortement influencée par les pays de la Triade ?",
        answers: [
            "L’ONU",
            "Le FMI (Fonds monétaire international)",
            "L’Union africaine",
            "L’OPEP"
        ],
        correct: 1
    },
    {
        question: "Quel pays de la Triade est souvent considéré comme le leader technologique mondial ?",
        answers: [
            "Le Japon",
            "Les États-Unis",
            "La France",
            "L’Italie"
        ],
        correct: 1
    },
    {
        question: "Quel est l’un des reproches faits à la Triade dans la mondialisation ?",
        answers: [
            "Elle monopolise les richesses mondiales et marginalise les pays en développement",
            "Elle aide trop les pays pauvres",
            "Elle refuse toute production industrielle",
            "Elle empêche les échanges culturels"
        ],
        correct: 0
    },
    {
        question: "Comment les pays émergents défient-ils la domination de la Triade ?",
        answers: [
            "Par leur croissance rapide et leur intégration dans le commerce mondial",
            "En fermant leurs frontières",
            "En arrêtant d’exporter",
            "En supprimant leurs devises"
        ],
        correct: 0
    },
    {
        question: "Quel événement a marqué le début du recul relatif de la domination de la Triade ?",
        answers: [
            "La montée de la Chine et des BRICS dans l’économie mondiale",
            "La fin de la guerre de Sécession",
            "L’indépendance de l’Inde en 1947",
            "La signature du traité de Versailles"
        ],
        correct: 0
    },
    {
        question: "Quel lien unit les pays de la Triade ?",
        answers: [
            "Un haut niveau de développement, une forte influence économique et une domination sur les échanges mondiaux",
            "Une même langue et culture",
            "Une seule monnaie commune",
            "Une union militaire globale"
        ],
        correct: 0
    }
];

class TriadeQuiz {
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
        if (percentage >= 90) resultsMessage.textContent = "Excellent ! Vous maîtrisez le rôle et la puissance de la Triade dans le monde.";
        else if (percentage >= 70) resultsMessage.textContent = "Très bien ! Vous comprenez les enjeux économiques de la Triade.";
        else if (percentage >= 50) resultsMessage.textContent = "Pas mal ! Vous connaissez les bases, mais révisez davantage la répartition mondiale des richesses.";
        else resultsMessage.textContent = "Revois les notions clés sur la Triade et son influence économique.";
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

document.addEventListener('DOMContentLoaded', () => new TriadeQuiz());
