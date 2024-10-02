//limpiar la salida, porque me sale aveces ¿Cerrar puerta? o otras cosas
//procesar el input de la IP y solo admitir el formato x.x.x.x
//enviar el comando hacia el eps8266
//alojar pagina en github y hace pruebas con el circuito armado

const microphoneIcon = document.getElementById('microphone-icon');
const statusText = document.getElementById('door-status');
const doorStateDiv = document.getElementById('door-state');

const micOffSrc = "imagenes/microfonoApagado.png";
const micOnSrc = "imagenes/microfonoEncendido.png";

function updateDoorState(state) {
    if (state === 'abierta') {
        doorStateDiv.textContent = 'Puerta abierta';
        doorStateDiv.style.backgroundColor = 'green';
    } else if(state === "cerrada"){
        doorStateDiv.textContent = 'Puerta cerrada';
        doorStateDiv.style.backgroundColor = 'red';
    }
}

//cambia el logo del microfono a encendido
function startRecording(){
    microphoneIcon.src = micOnSrc;
    microphoneIcon.classList.add('active');
}

//cambia el logo del microfono a apagado
function stopRecording(){
    microphoneIcon.src = micOffSrc;
    microphoneIcon.classList.remove('active');
}

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    // Crear una instancia del reconocimiento de voz
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // Configuraciones del reconocimiento
    recognition.lang = 'es-ES';  // Idioma español
    recognition.interimResults = false;  // No mostrar resultados parciales
    recognition.maxAlternatives = 1;  // Máxima cantidad de alternativas

    // Evento que ocurre cuando hay un resultado
    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        let transcriptNew = transcript.replace(/[^\w\sáéíóúñü]/gi, '');
        transcriptNew = transcriptNew.toLowerCase();
        statusText.textContent = transcriptNew; //cuando ya este limpia la traduccion, colocalo a la vista de la persona
    };

    // Eventos de inicio y fin
    recognition.onstart = function() {
        console.log("Grabando voz")
    };

    recognition.onend = function() {
        console.log("Finalizando grabado");
    };

    // Manejo de errores
    recognition.onerror = function(event) {
        statusText.textContent = 'Error de reconocimiento: ' + event.error;
    };

    microphoneIcon.addEventListener('mousedown', startRecording);
    microphoneIcon.addEventListener('mouseup', stopRecording);

    //si se mantiene precionado el logo cambialo a encendido
    microphoneIcon.addEventListener('touchstart', (e) => {
        e.preventDefault();
        recognition.start();
        startRecording();
    });

    //si se suelta el logo cambialo a apagado
    microphoneIcon.addEventListener('touchend', (e) => {
        e.preventDefault();
        recognition.stop();
        stopRecording();
    });

} else {
    // Si el navegador no soporta la API, mostrar un mensaje de error
    alert('Este navegador no soporta la Web Speech API');
}