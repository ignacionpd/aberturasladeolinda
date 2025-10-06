function cargar() {
    fetch("./json.json")
        .then(response => {
            if (!response.ok) {
             throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then(objeto_json => {
            let cadena_vidrios = "";
            let cadena_aperturas = "";

            // Recorrer datos de "Tipos de vidrios"
            for (let i = 0; i < objeto_json.vidrios.length; i++) {
                cadena_vidrios += "<strong>Tipo: </strong>" + objeto_json.vidrios[i].tipo + "<br>";
                cadena_vidrios += "<strong>Descripción: </strong>" + objeto_json.vidrios[i].descripcion + "<br>";
                cadena_vidrios += "<strong>Beneficios: </strong>" + objeto_json.vidrios[i].beneficios.join(", ") + "<br><br>";
            }

            // Recorrer datos de "Tipos de aperturas"
            for (let i = 0; i < objeto_json.tiposApertura.length; i++) {
                cadena_aperturas += "<strong>Nombre: </strong>" + objeto_json.tiposApertura[i].nombre + "<br>";
                cadena_aperturas += "<strong>Descripción: </strong>" + objeto_json.tiposApertura[i].descripcion + "<br>";
                cadena_aperturas += "<strong>Usos: </strong>" + objeto_json.tiposApertura[i].usos.join(", ") + "<br>";
                cadena_aperturas += "<strong>Ventajas: </strong>" + objeto_json.tiposApertura[i].ventajas.join(", ") + "<br><br>";
            }

            document.getElementById("vidrio").innerHTML = cadena_vidrios;
            document.getElementById("apertura").innerHTML = cadena_aperturas;
        })
        .catch(error => {
            alert(error.message);
            console.error(error);
        });


}

cargar();
