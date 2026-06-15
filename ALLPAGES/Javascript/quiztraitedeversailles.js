const quizData = [
    {
        question: "En quelle année le Traité de Versailles a-t-il été signé ?",
        answers: ["1918", "1919", "1920", "1921"],
        correct: 1
    },
    {
        question: "Quelle clause, très controversée, obligeait l’Allemagne à reconnaître sa responsabilité dans la guerre ?",
        answers: [
            "Article 231 « clause de la culpabilité de guerre »",
            "Article 250 « clause de la réparation »",
            "Article 101 « clause d’armistice »",
            "Article 50 « clause de réparations économiques »"
        ],
        correct: 0
    },
    {
        question: "Quelle fut l’une des pertes territoriales imposées à l’Allemagne par le traité ?",
        answers: [
            "La perte de l’Alsace-Lorraine en faveur de la Belgique",
            "La perte de l’Alsace-Lorraine en faveur de la France",
            "La perte de la totalité de la Prusse orientale au Royaume-Uni",
            "La perte de l’Autriche au profit de la Pologne"
        ],
        correct: 1
    },
    {
        question: "Quelle limite militaire principale fut imposée à l’Allemagne ?",
        answers: [
            "Interdiction de posséder une marine",
            "Armée réduite à 100 000 hommes",
            "Interdiction totale d’avoir une armée",
            "Armée limitée à 200 000 hommes et navy à 10 navires"
        ],
        correct: 1
    },
    {
        question: "Quel fut un effet économique majeur pour l’Allemagne après ce traité ?",
        answers: [
            "Croissance rapide et inflation maîtrisée",
            "Inflation massive, crise économique et chômage élevé",
            "Surproduction industrielle sans demande",
            "Aucune conséquence notable"
        ],
        correct: 1
    },
    {
        question: "Quel fut un des impacts politiques du traité sur l’Allemagne de l’entre-guerre ?",
        answers: [
            "Renforcement immédiat de la démocratie sans opposition",
            "Instabilité politique, montée des extrémismes et mécontentement",
            "Neutralité permanente de l’Allemagne",
            "Union immédiate avec l’Autriche"
        ],
        correct: 1
    },
    {
        question: "Le traité prévoyait la création d’un organe international pour maintenir la paix — lequel ?",
        answers: [
            "L’Organisation des Nations Unies",
            "La Société des Nations",
            "Le Pacte de Varsovie",
            "Le Conseil de Sécurité Européen"
        ],
        correct: 1
    },
    {
        question: "Comment ce traité est-il lié à l’éclatement de la Seconde Guerre mondiale ?",
        answers: [
            "Il garantit que l’Allemagne ne se relèverait jamais",
            "Ses conditions jugées trop sévères et humiliantes ont alimenté le revanchisme allemand",
            "Il a permis une paix durable sans conflit majeur",
            "Il a rendu l’Allemagne immédiatement puissante"
        ],
        correct: 1
    },
    {
        question: "Quelle conséquence territoriale pour les colonies allemandes ?",
        answers: [
            "Elles furent toutes conservées par l’Allemagne",
            "Elles furent perdues et confiées aux vainqueurs comme mandats",
            "Elles furent vendues à l’Italie",
            "Elles restèrent neutres"
        ],
        correct: 1
    },
    {
        question: "Quelle fut une conséquence pour l’ordre international suite au traité ?",
        answers: [
            "Un ordre parfaitement stable et durable",
            "Un ordre fragile, marqué par des tensions, crise économique et effondrement de coopération",
            "Le renforcement complet de la Société des Nations avec succès",
            "L’élimination de tous les conflits futurs"
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
            resultsMessage.textContent = 'Excellent ! Vous maîtrisez parfaitement le traité de versailles!';
        } else if (percentage >= 70) {
            resultsIcon.className = 'fas fa-medal results-icon good';
            resultsMessage.textContent = 'Très bien ! Vous avez de bonnes connaissances sur le traité de versailles.';
        } else if (percentage >= 50) {
            resultsIcon.className = 'fas fa-award results-icon average';
            resultsMessage.textContent = 'Pas mal ! Il y a encore quelques points à réviser sur le traité de versailles.';
        } else {
            resultsIcon.className = 'fas fa-book results-icon poor';
            resultsMessage.textContent = 'Il serait bon de réviser davantage sur le traité de versailles!.';
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