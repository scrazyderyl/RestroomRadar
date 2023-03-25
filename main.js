var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.4455452, lng: -79.9561952 },
    zoom: 16,
  });
}


function createMarker(lat, long, title) {

} 
function addInfoWindow(marker, message) {

  var infoWindow = new google.maps.InfoWindow({
      content: message
  });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
  });
}


window.initMap = initMap;