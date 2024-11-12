class Calendario {

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
        const raceContainer = $('main section');
        
        // Añadir el contenedor de carreras antes del footer
        $('#main-footer').before(raceContainer);
    
        // Generar y añadir cada carrera en una tarjeta <article> dentro del contenedor
        races.forEach(race => {
            const raceElement = $(`
                <article>
                    <header>
                        <h3>${race.raceName}</h3>
                    </header>
                    <p><strong>Circuito:</strong> ${race.Circuit.circuitName}</p>
                    <p><strong>Coordenadas:</strong> ${race.Circuit.Location.lat}, ${race.Circuit.Location.long}</p>
                    <p><strong>Fecha y Hora:</strong> ${race.date} ${race.time}</p>
                </article>
            `);
            
            raceContainer.append(raceElement);
        });
    }
}