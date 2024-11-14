class Api {
    constructor() {
        this.questions = [
            {
                question: "¿Quién ganó el campeonato de F1 en 2020?",
                options: ["Lewis Hamilton", "Max Verstappen", "Sebastian Vettel", "Charles Leclerc"],
                answer: "Lewis Hamilton"
            },
            {
                question: "¿Quién ha sido el único piloto español en ganar 2 mundiales?",
                options: ["Lewis Hamilton", "Charo charez", "Fernando Alonso", "Padrura"],
                answer: "Fernando Alonso"
            },
            {
                question: "¿Qué piloto brasileño tuvo una histórica rivalidad con Alain Prost?",
                options: ["Neymar Jr", "Vinicius", "Ayrton Senna", "Il predestinato"],
                answer: "Ayrton Senna"
            }
        ];

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') || 0;

        // Crear las secciones dinámicamente
        this.createSections();

        document.getElementById('start-button').addEventListener('click', () => this.startGame());
    }

    createSections() {
        const main = document.querySelector('main');

        // Crear contenedor de puntuación
        const scoreContainer = document.createElement('section');
        scoreContainer.classList.add('score-container');
        scoreContainer.innerHTML = `<h2>Puntuación: <span id="score">0</span></h2>`;
        scoreContainer.style.display = 'none';
        main.appendChild(scoreContainer);

        // Crear contenedor de pregunta
        const questionContainer = document.createElement('section');
        questionContainer.classList.add('question-container');
        questionContainer.style.display = 'none';
        main.appendChild(questionContainer);

        // Crear contenedor de opciones
        const optionsContainer = document.createElement('section');
        optionsContainer.classList.add('options-container');
        optionsContainer.style.display = 'none';
        main.appendChild(optionsContainer);

        // Crear contenedor de puntuación final
        const finalScoreContainer = document.createElement('section');
        finalScoreContainer.classList.add('final-score-container');
        finalScoreContainer.style.display = 'none';
        main.appendChild(finalScoreContainer);

        // Crear diálogo de puntuación final
        const scoreDialog = document.createElement('dialog');
        scoreDialog.id = 'score-dialog';
        main.appendChild(scoreDialog);
    }

    startGame() {
        document.querySelector('.welcome-screen').style.display = 'none';
        document.querySelector('.score-container').style.display = 'block';
        document.querySelector('.question-container').style.display = 'block';
        document.querySelector('.options-container').style.display = 'block';
        this.showQuestion();
        // Llamar a las funciones de las APIs en el inicio del juego
        this.getLocation();  // Geolocalización
        const highScore = this.getHighScore();  // Web Storage
        alert("La puntuación más alta es: " + highScore);
        this.connectWebSocket();  // WebSocket
    }

    showQuestion() {
        const questionContainer = document.querySelector('.question-container');
        const optionsContainer = document.querySelector('.options-container');
        const question = this.questions[this.currentQuestionIndex];

        questionContainer.innerHTML = `<h2>${question.question}</h2>`;
        optionsContainer.innerHTML = '';

        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option, button));
            optionsContainer.appendChild(button);
        });
    }

    checkAnswer(selectedOption, button) {
        const question = this.questions[this.currentQuestionIndex];
        const buttons = document.querySelectorAll('.options-container button');

        if (selectedOption === question.answer) {
            this.score++;
            button.classList.add('correct-answer');
            this.playSound('correct-answer.wav');
        } else {
            button.classList.add('incorrect');
            this.playSound('incorrect-answer.mp3');
        }

        buttons.forEach(btn => {
            if (btn.textContent === question.answer) {
                btn.classList.add('correct');
            }
            btn.disabled = true;
        });

        setTimeout(() => {
            this.currentQuestionIndex++;
            if (this.currentQuestionIndex < this.questions.length) {
                this.showQuestion();
            } else {
                this.endGame();
            }
        }, 2500);

        document.getElementById('score').textContent = this.score;
    }

    endGame() {
        const scoreDialog = document.getElementById('score-dialog');

        // Guardar nueva puntuación más alta si es mayor
        if (this.score > this.highScore) {
            localStorage.setItem('highScore', this.score);
            this.highScore = this.score;
        }

        // Mostrar puntuación final
        scoreDialog.innerHTML = `
            <h2>Juego Finalizado</h2>
            <p>Tu puntuación: <span class="final-score">${this.score}</span></p>
            <p>Puntuación más alta: <span class="high-score">${this.highScore}</span></p>
        `;

        // Añadir la clase 'show' para mostrar el diálogo
        scoreDialog.classList.add('show');

        // Mostrar el cuadro de diálogo
        scoreDialog.showModal();

        // Cerrar automáticamente el diálogo después de 4 segundos
        setTimeout(() => {
            scoreDialog.classList.remove('show');
            scoreDialog.close();
        }, 4000);
    }

    playSound(filename) {
        const audio = new Audio(`multimedia/audios/${filename}`);

        audio.play().then(() => {
            console.log('Audio is playing');
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    }

    // API Geolocation: Obtener la ubicación del usuario
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                alert(`Tu ubicación: Latitud: ${latitude}, Longitud: ${longitude}`);
            }, function(error) {
                alert(`Error: ${error.message}`);
            });
        } else {
            alert("La geolocalización no está soportada por tu navegador.");
        }
    }

    // API Web Storage: Guardar y cargar datos en el almacenamiento local
    saveHighScore(score) {
        localStorage.setItem("highScore", score);
    }

    getHighScore() {
        return localStorage.getItem("highScore") || 0;
    }

    // API WebSocket: Conexión a un servidor WebSocket
    connectWebSocket() {
        const ws = new WebSocket("wss://echo.websocket.org");

        ws.onopen = function() {
            alert("Conexión WebSocket establecida.");
            ws.send("¡Hola!");
        };

        ws.onerror = function(error) {
            alert("Error de conexión: " + error.message);
        };

        ws.onclose = function() {
            alert("Conexión cerrada.");
        };
    }
}
