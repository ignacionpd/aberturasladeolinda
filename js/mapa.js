let options = {
    enableHighAccuracy: true,  //Calcula la posición más exacta posible
    timeout: 5000,   // El tiempo en que intente en conseguir las coordenadas en milisegundos
    maximumAge: 0,   // El máximo tiempo para utilizar las coord. de caché
}

if(navigator.geolocation){    // Comprueba que nuestro disp. tenga la geoloc. activada
    navigator.geolocation.getCurrentPosition(
        success, 
        error, 
        options
    )
    
}else{
    alert("Los servicios de Geolocalización no están disponibles")
}

function success(position){
    //Calculamos la posición nuestra de usuario:
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // Iniciamos el mapa
    let map = L.map('map',{
        center: [latitude, longitude],
        zoom: 19
    })

    // Agregamos el texto que va debajo del mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Mi openStreetMap'
    }).addTo(map);

    // Generamos la ruta con las coordenadas de destino que le indicamos
    let control = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(38.343800, -0.516181)   
        ],
        // Le indicamos que queremos que nos explique en el idioma español
        language: 'es', 
    
    }).addTo(map);
} 

function error(){
        //Iniciamos el mapa
    let map = L.map('map',{
        center: [38.343800, -0.516181],  //Le ponemos las coordenadas de destino
        zoom: 14
    })

    // Agregamos el texto que va debajo del mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Mi openStreetMap'
    }).addTo(map);
}