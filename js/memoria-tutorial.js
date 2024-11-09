document.addEventListener("DOMContentLoaded", function() {
    // Abrir el tutorial
    const tutorialButton = document.getElementById('tutorial-button');
    const tutorialPopup = document.getElementById('tutorial-popup');
    const closeTutorial = document.getElementById('close-tutorial');

    tutorialButton.addEventListener('click', () => {
        tutorialPopup.showModal();
    });

    // Cerrar el tutorial
    closeTutorial.addEventListener('click', () => {
        tutorialPopup.close();
    });
});
