export async function conectarserConServidor(ruta_ip) {
    try{
        const respuestaDeSeridor = await fetch("http://" + ruta_ip + "/", {method: "GET"});

        if(!respuestaDeSeridor.ok){
            alert("No se pudo establecer conexion con servidor" + respuestaDeSeridor.statusText); //se realizo la solicitud pero no se pudo conectar
            return false;
        }

        const mensajeDeServidor = await respuestaDeSeridor.json();
        alert(mensajeDeServidor.message);
        return true
    }
    catch(error){
        alert("Error al realizar la solicitud, comprueba tu internet o la IP u otros");
        alert(error.message);
    }
}

export async function abrirPuerta(ruta_ip){
    try{
        const respuestaDeSeridor = await fetch("http://"+ ruta_ip +"/abrirPuerta", {method: "GET"});

        if(!respuestaDeSeridor.ok){
            alert("Error al abrir puerta " + respuestaDeSeridor.statusText);
            return;
        }

        const mensajeDeServidor = await respuestaDeSeridor.json();
        console.log(mensajeDeServidor.message);
    }
    catch(error){
        alert("Error al realiar la solicitud");
        alert("Pruebe la conexion a internet o la IP ");
        alert(error.message);
    }
}

export async function cerrarPuerta(ruta_ip) {
    try{
        const respuestaDeSeridor = await fetch("http://" + ruta_ip + "/cerrarPuerta", {method: "GET"});

        if(!respuestaDeSeridor.ok){
            alert("Error al cerrar puerta " + respuestaDeSeridor.statusText);
            return;
        }

        const mensajeDeServidor = await respuestaDeSeridor.json();
        console.log(mensajeDeServidor.message);
    }
    catch(error){
        alert("Error al realizar la solicitud");
        alert("Pruebe la conexion a internet o la IP");
        alert(error.message);
    }
}

export function validarIP(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
}