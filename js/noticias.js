class Noticias {
    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            console.log("Todas las APIs de File están soportadas.");
        } else {
            alert("La API de File no es soportada en este navegador.");
        }

        // Oculta el h2 de ultimas noticias
        document.querySelector('#noticias > h2').setAttribute('data-state', 'hidden');

        // Asegúrate de que el evento change del input file está siendo manejado
        document.getElementById('fileInput').addEventListener('change', (event) => this.readInputFile(event));
        
        // Manejar el evento de envío del formulario de añadir noticia
        document.getElementById('noticiaForm').addEventListener('submit', (event) => this.addNoticia(event));    
    }

    readInputFile(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target.result;
            this.displayNoticias(contents);
        };

        reader.readAsText(file);
    }

    displayNoticias(contents) {
        // Mostrar el h2 de ultimas noticias
        document.querySelector('#noticias > h2').setAttribute('data-state', 'visible');

        const lines = contents.split('\n');
        lines.forEach(line => {
            const [titular, entradilla, autor] = line.split('_');
            const noticiaHtml = `
                <article>
                    <header>
                        <h2>${titular}</h2>
                    </header>
                    <p>${entradilla}</p>
                    <footer>
                        <p><em>${autor}</em></p>
                    </footer>
                </article>
            `;
            $('section#noticias').append(noticiaHtml);
        });
    }

    addNoticia(event) {
        event.preventDefault();

        // Mostrar el h2 de ultimas noticias
        document.querySelector('#noticias > h2').setAttribute('data-state', 'visible');

        const titular = document.getElementById('titular').value;
        const entradilla = document.getElementById('entradilla').value;
        const autor = document.getElementById('autor').value;
        const contenido = document.getElementById('contenido').value;

        const noticiaHtml = `
            <article>
                <header>
                    <h2>${titular}</h2>
                </header>
                <p>${entradilla}</p>
                <p>${contenido}</p>
                <footer>
                    <p><em>${autor}</em></p>
                </footer>
            </article>
        `;

        $('section#noticias').append(noticiaHtml);

        // Limpia los campos del formulario después de añadir la noticia
        document.getElementById('noticiaForm').reset();
        
    }
}