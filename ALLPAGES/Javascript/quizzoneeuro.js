const quizData = [
    {
        question: "Qu’est-ce que la zone euro ?",
        answers: [
            "Une zone géographique d’Europe où circule le dollar américain",
            "L’ensemble des pays de l’Union européenne utilisant l’euro comme monnaie officielle",
            "L’ensemble des pays européens membres de l’OTAN",
            "Une zone commerciale entre l’Europe et l’Afrique"
        ],
        correct: 1
    },
    {
        question: "En quelle année l’euro a-t-il été mis en circulation sous forme de billets et pièces ?",
        answers: [
            "1999",
            "2002",
            "1995",
            "2000"
        ],
        correct: 1
    },
    {
        question: "Combien de pays composent actuellement la zone euro (en 2025) ?",
        answers: [
            "15",
            "19",
            "20",
            "27"
        ],
        correct: 2
    },
    {
        question: "Quelle institution gère la politique monétaire de la zone euro ?",
        answers: [
            "La Banque mondiale",
            "La Banque de France",
            "La Banque centrale européenne (BCE)",
            "Le Fonds monétaire international"
        ],
        correct: 2
    },
    {
        question: "Quel est l’un des avantages principaux de la zone euro ?",
        answers: [
            "La suppression des taux de change entre pays membres",
            "La disparition des impôts",
            "L’augmentation automatique des salaires",
            "La fin des exportations"
        ],
        correct: 0
    },
    {
        question: "Quelle condition un pays doit-il remplir pour rejoindre la zone euro ?",
        answers: [
            "Être membre de l’OTAN",
            "Avoir une monarchie stable",
            "Respecter les critères de convergence économique (stabilité budgétaire et inflation contrôlée)",
            "Parler une langue officielle de l’UE"
        ],
        correct: 2
    },
    {
        question: "Quel pays a quitté l’Union européenne sans jamais adopter l’euro ?",
        answers: [
            "L’Allemagne",
            "La France",
            "Le Royaume-Uni",
            "La Grèce"
        ],
        correct: 2
    },
    {
        question: "Quel rôle joue l’euro dans l’économie mondiale ?",
        answers: [
            "C’est la principale monnaie utilisée pour le commerce mondial",
            "C’est la deuxième monnaie de réserve mondiale après le dollar américain",
            "C’est une monnaie régionale sans influence mondiale",
            "C’est une devise utilisée uniquement en Europe centrale"
        ],
        correct: 1
    },
    {
        question: "Quelle crise majeure a fortement affecté la zone euro dans les années 2010 ?",
        answers: [
            "La crise de la dette en Grèce et dans plusieurs pays du sud de l’Europe",
            "La guerre froide",
            "Le Brexit",
            "La chute du mur de Berlin"
        ],
        correct: 0
    },
    {
        question: "Quelle est la devise officielle de la zone euro ?",
        answers: [
            "L’euro (€)",
            "Le franc européen",
            "Le mark commun",
            "Le dollar européen"
        ],
        correct: 0
    }
];

class EuroZoneQuiz {
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
        if (percentage >= 90) resultsMessage.textContent = "Excellent ! Vous maîtrisez parfaitement le fonctionnement et les enjeux de la zone euro.";
        else if (percentage >= 70) resultsMessage.textContent = "Très bien ! Vous connaissez bien la zone euro.";
        else if (percentage >= 50) resultsMessage.textContent = "Pas mal ! Quelques révisions seraient utiles.";
        else resultsMessage.textContent = "Revois les bases sur la création et le rôle de la zone euro.";
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

document.addEventListener('DOMContentLoaded', () => new EuroZoneQuiz());
