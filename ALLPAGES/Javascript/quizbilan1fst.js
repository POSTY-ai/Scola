const quizData = [
    {
        question: "En quelle année la Première Guerre mondiale a-t-elle pris fin ?",
        answers: ["1917", "1918", "1919", "1920"],
        correct: 1
    },
    {
        question: "Combien de morts la Première Guerre mondiale a-t-elle causé environ ?",
        answers: [
            "Environ 3 millions",
            "Environ 5 millions",
            "Environ 10 millions",
            "Environ 20 millions"
        ],
        correct: 2
    },
    {
        question: "Quel empire a disparu à la suite de la Première Guerre mondiale ?",
        answers: [
            "L’Empire britannique",
            "L’Empire allemand",
            "L’Empire ottoman",
            "L’Empire japonais"
        ],
        correct: 2
    },
    {
        question: "Quel fut l’impact économique majeur de la guerre en Europe ?",
        answers: [
            "Une forte croissance industrielle",
            "Un endettement massif et une crise économique",
            "Un excédent budgétaire record",
            "Une baisse du chômage durable"
        ],
        correct: 1
    },
    {
        question: "Quelle conséquence politique importante a suivi la guerre en Russie ?",
        answers: [
            "La révolution bolchevique et la création de l’URSS",
            "L’alliance avec l’Allemagne",
            "La restauration du tsar Nicolas II",
            "L’annexion de la France"
        ],
        correct: 0
    },
    {
        question: "Quel traité a mis officiellement fin à la guerre entre l’Allemagne et les Alliés ?",
        answers: [
            "Traité de Trianon",
            "Traité de Sèvres",
            "Traité de Versailles",
            "Traité de Paris"
        ],
        correct: 2
    },
    {
        question: "Comment appelle-t-on les soldats qui ont survécu aux tranchées et gardé des séquelles ?",
        answers: [
            "Les grognards",
            "Les poilus",
            "Les survivants d’honneur",
            "Les anciens combattants de 1870"
        ],
        correct: 1
    },
    {
        question: "Quelle organisation internationale fut créée après la guerre pour maintenir la paix ?",
        answers: [
            "L’Organisation des Nations Unies (ONU)",
            "La Société des Nations (SDN)",
            "Le Pacte de Varsovie",
            "L’OTAN"
        ],
        correct: 1
    },
    {
        question: "Quel rôle les États-Unis ont-ils joué à la fin de la guerre ?",
        answers: [
            "Ils ont soutenu militairement les Alliés dès 1914",
            "Ils sont restés neutres jusqu’en 1918",
            "Ils ont rejoint les Alliés en 1917 et influencé le traité de paix",
            "Ils ont combattu aux côtés de l’Allemagne"
        ],
        correct: 2
    },
    {
        question: "Quelle conséquence sociale majeure la guerre a-t-elle provoquée ?",
        answers: [
            "Un recul du travail féminin",
            "Une amélioration immédiate des conditions ouvrières",
            "Des millions d’orphelins et de mutilés de guerre",
            "Une baisse générale du coût de la vie"
        ],
        correct: 2
    }
];

// même logique de quiz réutilisable
class WWIQuiz {
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
        if (percentage >= 90) resultsMessage.textContent = "Excellent ! Vous maîtrisez parfaitement le bilan de la Première Guerre mondiale.";
        else if (percentage >= 70) resultsMessage.textContent = "Très bien ! Vos connaissances sur le bilan de la guerre sont solides.";
        else if (percentage >= 50) resultsMessage.textContent = "Pas mal ! Vous avez une bonne base, mais quelques points à revoir.";
        else resultsMessage.textContent = "Il serait bon de réviser davantage le bilan de la Première Guerre mondiale.";
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

document.addEventListener('DOMContentLoaded', () => new WWIQuiz());
