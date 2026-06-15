// Questions sur Elie Lescot
const quizData = [
    {
        question: "En quelle date a commencé le « Jeudi noir » à Wall Street marquant le krach boursier de 1929 ?",
        answers: ["14 octobre 1929", "24 octobre 1929", "29 octobre 1929", "12 novembre 1929"],
        correct: 1
    },
    {
        question: "Quelle était l’une des causes majeures de la crise de 1929 ?",
        answers: [
            "Une guerre majeure en Europe",
            "Une bulle spéculative et un endettement privé excessif",
            "La découverte de grandes réserves pétrolières",
            "Une récession antérieure prolongée de 10 ans"
        ],
        correct: 1
    },
    {
        question: "Quel terme désigne la période de longue dépression économique qui a suivi le krach de 1929 ?",
        answers: ["Le Grand Crash", "La Grande Dépression", "Le boom des années 20", "La crise pétrolière"],
        correct: 1
    },
    {
        question: "Quelle a été une des conséquences immédiates de la crise aux États-Unis ?",
        answers: [
            "L’augmentation massive de l’emploi",
            "La fermeture de nombreuses banques",
            "Une inflation rapide des prix",
            "La création immédiate de l’Union européenne"
        ],
        correct: 1
    },
    {
        question: "Comment la crise de 1929 s’est-elle propagée à l’échelle mondiale ?",
        answers: [
            "Par l’augmentation des exports américains",
            "Par la défaillance des échanges commerciaux et le rapatriement des capitaux américains",
            "Par une expansion rapide de la production agricole en Europe",
            "Par la guerre civile aux États-Unis"
        ],
        correct: 1
    },
    {
        question: "Quel secteur était particulièrement fragilisé avant la crise, contribuant à sa survenue ?",
        answers: [
            "L’industrie automobile et l’agriculture américaine en surproduction",
            "L’industrie aérienne mondiale",
            "Le secteur de l’énergie solaire",
            "Le commerce des services digitaux"
        ],
        correct: 0
    },
    {
        question: "Quel président américain était en place au moment du krach de 1929 ?",
        answers: [
            "Franklin D. Roosevelt",
            "Theodore Roosevelt",
            "Herbert Hoover",
            "Woodrow Wilson"
        ],
        correct: 2
    },
    {
        question: "Quelle politique a été mise en œuvre plus tard pour sortir de la crise ?",
        answers: [
            "Le New Deal",
            "La réduction totale des impôts pour les plus riches",
            "La fermeture des frontières américaines",
            "Le retour à un régime d’austérité extrême sans relance"
        ],
        correct: 0
    },
    {
        question: "Quel effet la crise a-t-elle eu sur le chômage aux États-Unis ?",
        answers: [
            "Le chômage est resté stable autour de 3 %",
            "Le chômage a fortement augmenté, atteignant des millions de sans-emploi",
            "Le chômage a disparu grâce à la relance immédiate",
            "Le chômage n’a concerné que le secteur agricole"
        ],
        correct: 1
    },
    {
        question: "Quel lien historique important la crise de 1929 a-t-elle avec les événements ultérieurs ?",
        answers: [
            "Elle a directement déclenché la Première Guerre mondiale",
            "Elle a favorisé la montée des régimes totalitaires en Europe",
            "Elle a conduit à l’invention de l’Internet",
            "Elle a été la cause principale de la découverte de l’Amérique"
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
            resultsMessage.textContent = 'Excellent ! Vous maîtrisez parfaitement la crise de 1929!';
        } else if (percentage >= 70) {
            resultsIcon.className = 'fas fa-medal results-icon good';
            resultsMessage.textContent = 'Très bien ! Vous avez de bonnes connaissances sur la crise de 1929.';
        } else if (percentage >= 50) {
            resultsIcon.className = 'fas fa-award results-icon average';
            resultsMessage.textContent = 'Pas mal ! Il y a encore quelques points à réviser sur la crise de 1929.';
        } else {
            resultsIcon.className = 'fas fa-book results-icon poor';
            resultsMessage.textContent = 'Il serait bon de réviser davantage sur la crise de 1929.';
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