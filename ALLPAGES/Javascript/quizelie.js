// Questions sur Élie Lescot
const quizData = [
    {
        question: "En quelle année Élie Lescot devient-il président ?",
        answers: ["1934", "1941", "1946", "1950"],
        correct: 1
    },
    {
        question: "Quel programme agricole lancé pendant son mandat visait à produire du caoutchouc, impliquant une entreprise américaine ?",
        answers: [
            "SHADA (Société Haïtiano-Américaine de Développement Agricole)",
            "AgroHaïti 1942",
            "RubertHaïti Ltd",
            "Projet Banane Plus"
        ],
        correct: 0
    },
    {
        question: "Quel changement constitutionnel ou politique majeur a permis à Lescot de prolonger son pouvoir ?",
        answers: [
            "Il a aboli le parlement",
            "Il a transféré la capitale",
            "Il a prolongé son mandat présidentiel",
            "Il a instauré une monarchie"
        ],
        correct: 2
    },
    {
        question: "Quelle caractéristique de son gouvernement a provoqué une opposition croissante parmi la majorité noire d'Haïti ?",
        answers: [
            "Une réforme agraire très favorable aux paysans",
            "L'ouverture large à la presse indépendante",
            "Une politique favorisant l'élite mulâtre et excluant les Noirs",
            "La nationalisation de toutes les terres agricoles"
        ],
        correct: 2
    },
    {
        question: "Quelle a été la cause immédiate ou un déclencheur clé de la chute du gouvernement de Lescot en 1946 ?",
        answers: [
            "Un tremblement de terre",
            "Une grève étudiante et des manifestations populaires",
            "Une attaque militaire étrangère",
            "La signature d'un nouveau traité avec les États-Unis"
        ],
        correct: 1
    },
    {
        question: "Avec quel dirigeant étranger Lescot entretenait-il une relation politique controversée ?",
        answers: ["Franklin D. Roosevelt", "Joseph Staline", "Winston Churchill", "Rafael Trujillo"],
        correct: 3
    },
    {
        question: "Quelle mesure liée à la liberté de la presse a caractérisé ce régime ?",
        answers: [
            "Une totale liberté de presse",
            "Une censure croissante des journaux et publications critiques",
            "L'invention de la radio publique indépendante",
            "Le développement d'un réseau de télévision libre"
        ],
        correct: 1
    },
    {
        question: "Pendant la Seconde Guerre mondiale, quel camp Lescot a-t-il déclaré soutenir ?",
        answers: [
            "Les forces de l'Axe (Allemagne, Japon, Italie)",
            "Les Alliés (États-Unis, Royaume-Uni, France, Chine)",
            "L'URSS exclusivement",
            "Il reste neutre"
        ],
        correct: 1
    },
    {
        question: "Quel a été un des effets économiques négatifs pour les paysans haïtiens lors du projet agricole caoutchouc ?",
        answers: [
            "Augmentation massive des salaires agricoles",
            "Déplacement des familles paysannes des terres fertiles",
            "Forte augmentation des exportations de caoutchouc avec bénéfice pour tous",
            "1945"
        ],
        correct: 1
    },
    {
        question: "Quelle est la date de la fin du mandat de Lescot à la présidence ?",
        answers: ["15 mai 1945", "1er août 1946", "20 octobre 1944", "11 janvier 1946"],
        correct: 3
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
            resultsMessage.textContent = 'Excellent ! Vous maîtrisez parfaitement le gouvernement d\'Elie Lescot !';
        } else if (percentage >= 70) {
            resultsIcon.className = 'fas fa-medal results-icon good';
            resultsMessage.textContent = 'Très bien ! Vous avez de bonnes connaissances sur lElie Lescot.';
        } else if (percentage >= 50) {
            resultsIcon.className = 'fas fa-award results-icon average';
            resultsMessage.textContent = 'Pas mal ! Il y a encore quelques points à réviser sur ce chef d\'Etat.';
        } else {
            resultsIcon.className = 'fas fa-book results-icon poor';
            resultsMessage.textContent = 'Il serait bon de réviser davantage sur Elie Lescot.';
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