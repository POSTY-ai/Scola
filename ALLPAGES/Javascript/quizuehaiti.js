const quizData = [
    {
        question: "Quel type de relation économique existe entre Haïti et l’Union européenne ?",
        answers: [
            "Une relation de dépendance militaire",
            "Un partenariat de coopération et d’aide au développement",
            "Une union douanière complète",
            "Une rivalité commerciale directe"
        ],
        correct: 1
    },
    {
        question: "Quel programme de l’Union européenne soutient les pays d’Afrique, des Caraïbes et du Pacifique (dont Haïti) ?",
        answers: [
            "Le programme Erasmus",
            "L’Accord de Cotonou",
            "Le Pacte vert européen",
            "Le plan Juncker"
        ],
        correct: 1
    },
    {
        question: "Dans quel domaine l’UE aide-t-elle le plus Haïti ?",
        answers: [
            "La recherche nucléaire",
            "L’agriculture, l’éducation et la gouvernance démocratique",
            "La conquête spatiale",
            "L’industrie automobile"
        ],
        correct: 1
    },
    {
        question: "Quelle organisation européenne gère l’aide humanitaire pour Haïti ?",
        answers: [
            "L’OTAN",
            "ECHO (Direction générale de la protection civile et des opérations d’aide humanitaire européennes)",
            "La BCE (Banque centrale européenne)",
            "Le Parlement européen"
        ],
        correct: 1
    },
    {
        question: "Quel grand événement a conduit à une augmentation de l’aide européenne à Haïti ?",
        answers: [
            "Le séisme de 2010",
            "Les élections de 2000",
            "L’indépendance de 1804",
            "La crise de 1929"
        ],
        correct: 0
    },
    {
        question: "Sous quelle forme principale l’Union européenne soutient-elle Haïti ?",
        answers: [
            "Par des investissements militaires",
            "Par des dons, subventions et programmes de coopération",
            "Par des prêts à taux élevés",
            "Par des échanges de matières premières"
        ],
        correct: 1
    },
    {
        question: "Quel est l’un des objectifs de l’aide de l’UE à Haïti ?",
        answers: [
            "Favoriser la dépendance politique",
            "Renforcer la résilience économique et institutionnelle du pays",
            "Imposer une monnaie européenne en Haïti",
            "Créer une base militaire européenne"
        ],
        correct: 1
    },
    {
        question: "Quel secteur bénéficie aussi du soutien européen en matière de développement durable ?",
        answers: [
            "La pêche, l’énergie renouvelable et la gestion de l’eau",
            "La construction d’armes",
            "L’exploitation minière illégale",
            "La publicité"
        ],
        correct: 0
    },
    {
        question: "Quel principe guide la coopération de l’UE avec Haïti ?",
        answers: [
            "La neutralité économique",
            "La solidarité, la démocratie et le développement durable",
            "La concurrence et le protectionnisme",
            "L’unification politique"
        ],
        correct: 1
    },
    {
        question: "Quel type d’influence l’Union européenne exerce-t-elle sur Haïti ?",
        answers: [
            "Une influence militaire",
            "Une influence économique, culturelle et humanitaire",
            "Une influence coloniale directe",
            "Aucune influence"
        ],
        correct: 1
    }
];

class EUInfluenceQuiz {
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
        if (percentage >= 90) resultsMessage.textContent = "Excellent ! Vous comprenez très bien l’influence de l’Union européenne sur Haïti.";
        else if (percentage >= 70) resultsMessage.textContent = "Très bien ! Vous avez une bonne connaissance du rôle de l’UE en Haïti.";
        else if (percentage >= 50) resultsMessage.textContent = "Pas mal ! Continuez à réviser la coopération UE–Haïti.";
        else resultsMessage.textContent = "Revois les bases de l’aide et de l’influence européenne sur Haïti.";
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

document.addEventListener('DOMContentLoaded', () => new EUInfluenceQuiz());
