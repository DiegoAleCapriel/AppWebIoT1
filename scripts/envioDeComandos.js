import {conectarserConServidor, abrirPuerta, cerrarPuerta, validarIP} from "../scripts/funcionesDeRed.js";

const boton_enviar_comando = document.getElementById("send-btn");
const boton_cancelar_comando = document.getElementById("cancel-btn");

const textoTraducido = document.getElementById('door-status');

const ipDeServidorEsp8266 = document.getElementById("ip-input");
const botonDeConexion = document.getElementById("connect-btn");

let servidorConectado = false;

botonDeConexion.addEventListener("click", function(e){
    e.preventDefault();

    if(!validarIP(ipDeServidorEsp8266.value)){
        alert("Formato de direccion ip no valido");
    }

    if(conectarserConServidor(ipDeServidorEsp8266.value)){
        servidorConectado = true;
    }
    else{
        servidorConectado = false;
    }
})

boton_enviar_comando.addEventListener("click", function(e){
    e.preventDefault();

    if(textoTraducido.textContent === "abrir puerta" && servidorConectado){
        if(validarIP(ipDeServidorEsp8266.value)){
            abrirPuerta(ipDeServidorEsp8266.value)
        }
        else{
            alert("Formato de direccion ip no valido o servidor no conectado");
        }
    }
    else if(textoTraducido.textContent === "cerrar puerta" && servidorConectado){
        if(validarIP(ipDeServidorEsp8266.value)){
            cerrarPuerta(ipDeServidorEsp8266.value);
        }
        else{
            alert("Formato de direccion ip no valido o servidor no conectado")
        }
    }
})

boton_cancelar_comando.addEventListener("click", function(e){
    e.preventDefault();

    textoTraducido.textContent = "";
    alert("Envio de comando cancelado");
})
