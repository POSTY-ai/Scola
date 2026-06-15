// Questions sur la Première Guerre Mondiale
const quizData = [
    {
        question: "En quelle année a commencé la Première Guerre mondiale ?",
        answers: ["1912", "1914", "1916", "1918"],
        correct: 1
    },
    {
        question: "Quel événement a déclenché la Première Guerre mondiale ?",
        answers: [
            "L'invasion de la Belgique",
            "L'assassinat de l'archiduc François-Ferdinand",
            "La déclaration de guerre de l'Allemagne à la France",
            "L'attaque de Pearl Harbor"
        ],
        correct: 1
    },
    {
        question: "Dans quelle ville l'archiduc François-Ferdinand a-t-il été assassiné ?",
        answers: ["Vienne", "Belgrade", "Sarajevo", "Budapest"],
        correct: 2
    },
    {
        question: "Quelles étaient les principales puissances de la Triple Alliance ?",
        answers: [
            "France, Russie, Royaume-Uni",
            "Allemagne, Autriche-Hongrie, Italie",
            "États-Unis, France, Royaume-Uni",
            "Allemagne, Russie, Autriche-Hongrie"
        ],
        correct: 1
    },
    {
        question: "Quelle bataille est considérée comme l'une des plus sanglantes de la guerre ?",
        answers: ["Bataille de la Marne", "Bataille de Verdun", "Bataille de la Somme", "Bataille de Tannenberg"],
        correct: 1
    },
    {
        question: "En quelle année les États-Unis sont-ils entrés dans la guerre ?",
        answers: ["1915", "1916", "1917", "1918"],
        correct: 2
    },
    {
        question: "Qu'est-ce que la 'guerre des tranchées' ?",
        answers: [
            "Une guerre navale",
            "Une guerre aérienne",
            "Une guerre de position avec des tranchées",
            "Une guerre de mouvement rapide"
        ],
        correct: 2
    },
    {
        question: "Quel traité a officiellement mis fin à la Première Guerre mondiale avec l'Allemagne ?",
        answers: ["Traité de Versailles", "Traité de Saint-Germain", "Traité de Trianon", "Traité de Sèvres"],
        correct: 0
    },
    {
        question: "Quelle nouvelle arme chimique a été largement utilisée pendant cette guerre ?",
        answers: ["La dynamite", "Le gaz moutarde", "La poudre noire", "Le napalm"],
        correct: 1
    },
    {
        question: "En quelle année la guerre s'est-elle terminée ?",
        answers: ["1917", "1918", "1919", "1920"],
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
            resultsMessage.textContent = 'Excellent ! Vous maîtrisez parfaitement l\'histoire de la Première Guerre mondiale !';
        } else if (percentage >= 70) {
            resultsIcon.className = 'fas fa-medal results-icon good';
            resultsMessage.textContent = 'Très bien ! Vous avez de bonnes connaissances sur la Première Guerre mondiale.';
        } else if (percentage >= 50) {
            resultsIcon.className = 'fas fa-award results-icon average';
            resultsMessage.textContent = 'Pas mal ! Il y a encore quelques points à réviser sur cette période.';
        } else {
            resultsIcon.className = 'fas fa-book results-icon poor';
            resultsMessage.textContent = 'Il serait bon de réviser davantage l\'histoire de la Première Guerre mondiale.';
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
});*/