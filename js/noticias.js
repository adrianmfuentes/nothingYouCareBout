class Noticias {
    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            console.log("Todas las APIs de File están soportadas.");
        } else {
            alert("La API de File no es soportada en este navegador.");
        }

        // Asegúrate de que el evento change del input file está siendo manejado
        document.getElementById('fileInput').addEventListener('change', (event) => this.readInputFile(event));
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

    addNoticia(titular, entradilla, autor) {
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
    }
}