class Agenda {

    constructor() {
        this.apiUrl = 'https://api.jolpi.ca/ergast/f1/2024.json';
        this.fetchRaces();
    }

    fetchRaces() {
        $.ajax({
            url: this.apiUrl,
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                this.displayRaces(data.MRData.RaceTable.Races);
            },
            error: (error) => {
                console.error('Error fetching race data:', error);
            }
        });
    }

    displayRaces(races) {
        // Seleccionar el body y vaciar cualquier contenido previo de carreras si existe
        const body = $('body');
        // Remover el contenedor previo de carreras si existe
        $('#race-container').remove();
    
        // Crear un nuevo contenedor para las carreras y añadirlo al body
        const raceContainer = $(`
            <div id="race-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; padding: 2rem; max-width: 1200px; margin: 0 auto;">
            </div>
        `);
        
        $('#main-footer').before(raceContainer);
    
        // Generar y añadir cada carrera en una tarjeta <article> dentro del contenedor
        races.forEach(race => {
            const raceElement = $(`
                <article style="background-color: #FFF6E1; border: 1px solid #1F3B4D; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); font-size: 1.1rem;">
                    <h3>${race.raceName}</h3>
                    <p><strong>Circuito:</strong> ${race.Circuit.circuitName}</p>
                    <p><strong>Coordenadas:</strong> ${race.Circuit.Location.lat}, ${race.Circuit.Location.long}</p>
                    <p><strong>Fecha y Hora:</strong> ${race.date} ${race.time}</p>
                </article>
            `);
            
            raceContainer.append(raceElement);
        });
    }
}