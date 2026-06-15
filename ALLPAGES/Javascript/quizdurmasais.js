// Questions sur Durmasais Estimé
const quizData = [
    {
        question: "En quelle année Durmasais Estimé est-il devenu président d'Haïti ?",
        answers: ["1941", "1946", "1950", "1944"],
        correct: 1
    },
    {
        question: "Quel était l'un de ses anciens postes avant d'être président ?",
        answers: [
            "Ministre de la défense",
            "Ministre de l'instruction publique, de l'Agriculture et du travail",
            "Ministre des finances",
            "Gouverneur de la banque centrale"
        ],
        correct: 1
    },
    {
        question: "Quel grand projet public ou symbole de développement a-t-on lancé sous Durmasais Estimé ?",
        answers: [
            "Le barrage de Peligre",
            "Un tunnel sous-marin vers la République Dominicaine",
            "Un aéroport international à Cap-Haïtien",
            "Une ligne de chemin de fer nationale"
        ],
        correct: 0
    },
    {
        question: "Quelle mesure financière ou économique Estimé a mise en œuvre pour restaurer l'indépendance économique d'Haïti ?",
        answers: [
            "Il a supprimé tous les impôts directs",
            "Il a lancé une campagne nationale pour rembourser la dette et reprendre le contrôle de la banque nationale",
            "Il a accepté une nouvelle occupation",
            "Il a uniquement recruté des investisseurs étrangers"
        ],
        correct: 1
    },
    {
        question: "Quel a été le motif principal de la chute de son gouvernement en 1950 ?",
        answers: [
            "Une invasion militaire étrangère",
            "Une grave crise sanitaire",
            "Une tentative de modifier la constitution pour rester au pouvoir, combinée à la pression de l'armée",
            "Une catastrophe naturelle"
        ],
        correct: 2
    },
    {
        question: "Quel événement d'envergure internationale a eu lieu sous son mandat ?",
        answers: [
            "L'adhésion d'Haïti à l'OTAN",
            "L'organisation à Port-au-Prince de l'exposition internationale pour le bicentenaire en 1949",
            "La conférence de Yalta tenue à Haïti",
            "Le sommet du Pacte de Varsovie"
        ],
        correct: 1
    },
    {
        question: "Quelle politique culturelle marquante a-t-on enregistrée sous Durmasais Estimé ?",
        answers: [
            "La fermeture de toutes les écoles rurales",
            "Le renforcement de l'accès à l'éducation, notamment création d'écoles dans les provinces",
            "L'interdiction de la langue française",
            "L'abolition de tous les syndicats"
        ],
        correct: 1
    },
    {
        question: "Quelle était l'une des caractéristiques diplomatiques de son mandat ?",
        answers: [
            "Haïti s'est retirée des Nations Unies",
            "Haïti a renforcé ses liens avec les États-Unis et a participé à la décolonisation et à la politique d'Amérique intercontinentale",
            "Il a signé un traité avec l'URSS pour devenir un État satellite",
            "Il a fermement soutenu l'occupation étrangère de son pays"
        ],
        correct: 1
    },
    {
        question: "D'où était originaire Durmasais Estimé ?",
        answers: [
            "Cap-Haïtien",
            "Verrettes, Artibonite",
            "Jacmel",
            "Port-au-Prince"
        ],
        correct: 1
    },
    {
        question: "Quel fut l'un des défis majeurs auxquels son gouvernement a dû faire face ?",
        answers: [
            "Une hyperinflation à plus de 1000%",
            "L'opposition de l'élite et de l'armée à ses réformes et à la redistribution du pouvoir",
            "L'occupation militaire franco-britannique",
            "La disparition complète des revenus d'exportation"
        ],
        correct: 1
    }
];


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

        // Update question info
        this.questionNumberEl.textContent = `Question ${this.currentQuestion + 1}`;
        this.questionTextEl.textContent = question.question;

        // Update progress
        const progress = ((this.currentQuestion + 1) / quizData.length) * 100;
        this.progressFillEl.style.width = `${progress}%`;
        this.progressTextEl.textContent = `Question ${this.currentQuestion + 1} / ${quizData.length}`;

        // Display answers
        this.answersContainerEl.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const answerEl = this.createAnswerElement(answer, index);
            this.answersContainerEl.appendChild(answerEl);
        });

        // Update navigation buttons
        this.prevBtnEl.disabled = this.currentQuestion === 0;
        this.nextBtnEl.disabled = true;
        this.nextBtnEl.textContent = this.currentQuestion === quizData.length - 1 ? 'Terminer' : 'Suivant';

        // Add animation
        this.quizCardEl.style.animation = 'none';
        this.quizCardEl.offsetHeight; // Trigger reflow
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

        // Remove previous selections
        document.querySelectorAll('.answer-option').forEach(el => {
            el.classList.remove('selected');
        });

        // Mark selected answer
        selectedEl.classList.add('selected');
        this.userAnswers[this.currentQuestion] = selectedIndex;
        this.isAnswered = true;

        // Enable next button
        this.nextBtnEl.disabled = false;

        // Show correct/incorrect feedback
        setTimeout(() => {
            this.showAnswerFeedback();
        }, 500);
    }

    showAnswerFeedback() {
        const question = quizData[this.currentQuestion];
        const userAnswer = this.userAnswers[this.currentQuestion];
        const correctAnswer = question.correct;

        document.querySelectorAll('.answer-option').forEach((el, index) => {
            if (index === correctAnswer) {
                el.classList.add('correct');
            } else if (index === userAnswer && userAnswer !== correctAnswer) {
                el.classList.add('incorrect');
            }
        });

        if (userAnswer === correctAnswer) {
            this.score++;
        }
    }

    nextQuestion() {
        if (this.currentQuestion < quizData.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
            
            // If user already answered this question, show their answer
            if (this.userAnswers[this.currentQuestion] !== undefined) {
                const userAnswer = this.userAnswers[this.currentQuestion];
                const answerOptions = document.querySelectorAll('.answer-option');
                answerOptions[userAnswer].classList.add('selected');
                this.isAnswered = true;
                this.nextBtnEl.disabled = false;
                
                setTimeout(() => {
                    this.showAnswerFeedback();
                }, 100);
            }
        }
    }

    showResults() {
        this.quizCardEl.classList.add('hidden');
        this.resultsCardEl.classList.remove('hidden');

        const percentage = Math.round((this.score / quizData.length) * 100);
        const correctCount = this.score;
        const incorrectCount = quizData.length - this.score;

        // Update score display
        document.getElementById('scoreNumber').textContent = this.score;
        document.getElementById('correctCount').textContent = correctCount;
        document.getElementById('incorrectCount').textContent = incorrectCount;
        document.getElementById('percentageScore').textContent = `${percentage}%`;

        // Update score circle
        const scoreAngle = (this.score / quizData.length) * 360;
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.style.setProperty('--score-angle', `${scoreAngle}deg`);

        // Update results message and icon
        const resultsIcon = document.getElementById('resultsIcon');
        const resultsMessage = document.getElementById('resultsMessage');

        if (percentage >= 90) {
            resultsIcon.className = 'fas fa-trophy results-icon excellent';
            resultsMessage.textContent = 'Excellent ! Vous maîtrisez parfaitement le gouvernement de Durmasais !';
        } else if (percentage >= 70) {
            resultsIcon.className = 'fas fa-medal results-icon good';
            resultsMessage.textContent = 'Très bien ! Vous avez de bonnes connaissances sur Durmasais .';
        } else if (percentage >= 50) {
            resultsIcon.className = 'fas fa-award results-icon average';
            resultsMessage.textContent = 'Pas mal ! Il y a encore quelques points à réviser sur ce chef d\'Etat.';
        } else {
            resultsIcon.className = 'fas fa-book results-icon poor';
            resultsMessage.textContent = 'Il serait bon de réviser davantage sur Durmasais.';
        }

        // Animate score counting
        this.animateScore();
    }

    animateScore() {
        const scoreNumberEl = document.getElementById('scoreNumber');
        let currentScore = 0;
        const targetScore = this.score;
        const duration = 1000;
        const increment = targetScore / (duration / 50);

        const timer = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(timer);
            }
            scoreNumberEl.textContent = Math.floor(currentScore);
        }, 50);
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

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WWIQuiz();
});

// Add some interactive effects
/*document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.quiz-card, .results-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    });
}); */