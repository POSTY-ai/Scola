const quizData = [
    {
        question: "Qu’est-ce que la mondialisation ?",
        answers: [
            "La fermeture des frontières et la fin des échanges entre pays",
            "Le processus d’intensification des échanges économiques, culturels et technologiques à l’échelle mondiale",
            "La domination d’un seul pays sur le reste du monde",
            "La suppression de toutes les monnaies nationales"
        ],
        correct: 1
    },
    {
        question: "Quelle révolution a fortement contribué à l’accélération de la mondialisation ?",
        answers: [
            "La révolution industrielle",
            "La révolution française",
            "La révolution russe",
            "La révolution numérique seulement"
        ],
        correct: 0
    },
    {
        question: "Quel est l’un des principaux acteurs de la mondialisation ?",
        answers: [
            "Les entreprises multinationales",
            "Les petits commerces locaux uniquement",
            "Les associations de quartier",
            "Les familles rurales"
        ],
        correct: 0
    },
    {
        question: "Quel est l’un des effets positifs de la mondialisation ?",
        answers: [
            "L’accès plus large aux marchés et aux produits étrangers",
            "La disparition des emplois",
            "La fin du commerce international",
            "La fermeture des frontières"
        ],
        correct: 0
    },
    {
        question: "Quel est l’un des inconvénients majeurs de la mondialisation ?",
        answers: [
            "L’augmentation des inégalités économiques",
            "La réduction de la pauvreté mondiale",
            "L’égalité parfaite entre les nations",
            "La baisse du commerce international"
        ],
        correct: 0
    },
    {
        question: "Quels continents profitent le plus de la mondialisation économique ?",
        answers: [
            "L’Europe et l’Amérique du Nord",
            "L’Antarctique et l’Océanie uniquement",
            "L’Afrique et l’Asie uniquement",
            "Aucun continent n’en profite"
        ],
        correct: 0
    },
    {
        question: "Quel rôle joue Internet dans la mondialisation ?",
        answers: [
            "Il limite les échanges d’informations",
            "Il favorise la communication et le commerce mondial",
            "Il empêche la diffusion des cultures",
            "Il n’a aucun rôle"
        ],
        correct: 1
    },
    {
        question: "Quelle organisation internationale est au cœur du commerce mondial ?",
        answers: [
            "L’Organisation mondiale du commerce (OMC)",
            "L’UNICEF",
            "L’UNESCO",
            "La Croix-Rouge"
        ],
        correct: 0
    },
    {
        question: "Quel phénomène culturel accompagne souvent la mondialisation ?",
        answers: [
            "L’uniformisation culturelle et la diffusion des modèles occidentaux",
            "La disparition de toute influence culturelle",
            "La fermeture culturelle totale",
            "L’isolement des civilisations"
        ],
        correct: 0
    },
    {
        question: "Que peut-on faire pour réduire les effets négatifs de la mondialisation ?",
        answers: [
            "Promouvoir le commerce équitable et la durabilité",
            "Fermer toutes les frontières",
            "Supprimer Internet",
            "Interdire le tourisme"
        ],
        correct: 0
    }
];

class MondialisationQuiz {
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
        if (percentage >= 90) resultsMessage.textContent = "Excellent ! Vous comprenez parfaitement les enjeux de la mondialisation.";
        else if (percentage >= 70) resultsMessage.textContent = "Très bien ! Vous avez une bonne compréhension du phénomène.";
        else if (percentage >= 50) resultsMessage.textContent = "Pas mal ! Quelques révisions seraient utiles.";
        else resultsMessage.textContent = "Revois les notions de base sur la mondialisation et ses effets.";
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

document.addEventListener('DOMContentLoaded', () => new MondialisationQuiz());
