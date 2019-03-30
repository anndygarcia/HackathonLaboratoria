document.addEventListener('DOMContentLoaded', () => { // DOMContentLoaded es un evento
    observador();
}, false);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (objPosition) {
        // Dibuja mapa inicial con marcador de posicion
        let defaultLayers = platform.createDefaultLayers();
        let map = new H.Map(document.getElementById('mapContainer'),
            defaultLayers.normal.map,
            {
                zoom: 14.5,
                center: {
                    lat: objPosition.coords.latitude,
                    lng: objPosition.coords.longitude
                }
            });
        let icon = new H.map.Icon('../assets/location.png');
        let marker = new H.map.Marker({
            lat: objPosition.coords.latitude,
            lng: objPosition.coords.longitude
        },
            { icon: icon });
        map.addObject(marker);
    })
}