class Semaforo {
    constructor() {
        this.levels = [0.2, 0.5, 0.8];
        this.lights = 4;
        this.unload_moment = null;
        this.clic_moment = null;

        const randomIndex = Math.floor(Math.random() * this.levels.length);
        this.difficulty = this.levels[randomIndex];

        this.createStructure();
    }

    createStructure() {
        const main = document.querySelector("main");

        const title = document.createElement("h2");
        title.textContent = "Juego de Tiempo de Reacción - Semáforo";
        main.appendChild(title);

        const semaforoContainer = document.createElement("section");
        semaforoContainer.id = "semaforo";
        const h2 = document.createElement('h2');
        h2.textContent = "Semáforo"; 
        semaforoContainer.appendChild(h2);
        main.appendChild(semaforoContainer);

        for (let i = 1; i <= this.lights; i++) {
            const light = document.createElement("div");
            light.className = "light";
            light.id = `light${i}`;
            semaforoContainer.appendChild(light);
        }

        const startButton = document.createElement("button");
        startButton.id = "startButton";
        startButton.textContent = "Arranque";
        startButton.onclick = () => this.initSequence();
        main.appendChild(startButton);

        const reactionButton = document.createElement("button");
        reactionButton.id = "reactionButton";
        reactionButton.textContent = "Registrar Tiempo de Reacción";
        reactionButton.onclick = () => this.stopReaction(); 
        reactionButton.disabled = true;
        main.appendChild(reactionButton);

        const reactionTimeDisplay = document.createElement("p");
        reactionTimeDisplay.id = "reactionTime";
        main.appendChild(reactionTimeDisplay);
    }

    initSequence() {
        const main = document.querySelector("main");
        main.classList.add("load");  
        const startButton = document.getElementById("startButton");
        startButton.disabled = true;  

        let minSeconds, maxSeconds;

        if (this.difficulty === 0.2) {
            minSeconds = 2;
            maxSeconds = 4;
        } else if (this.difficulty === 0.5) {
            minSeconds = 4;
            maxSeconds = 6;
        } else if (this.difficulty === 0.8) {
            minSeconds = 6;
            maxSeconds = 8;
        }

        const randomSeconds = Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds; 
        const timeoutDuration = randomSeconds * 1000;

        setTimeout(() => {
            this.turnOffLights();
        }, timeoutDuration);
    }

    turnOffLights() {
        const main = document.querySelector("main");
        main.classList.remove("load"); 
        main.classList.add("unload"); 

        this.unload_moment = new Date();
        const reactionButton = document.getElementById("reactionButton");
        reactionButton.disabled = false;
    }

    stopReaction() {
        this.clic_moment = new Date();
        const reactionTime = this.clic_moment - this.unload_moment; 
        const reactionTimeSeconds = (reactionTime / 1000).toFixed(3); 

        document.getElementById("reactionTime").innerText = 
            `Tiempo de reacción: ${reactionTimeSeconds} segundos`;

        const main = document.querySelector("main");
        main.classList.remove("load");
        main.classList.remove("unload");

        const reactionButton = document.getElementById("reactionButton");
        reactionButton.disabled = true; 
        const startButton = document.getElementById("startButton");
        startButton.disabled = false; 
    }
}
