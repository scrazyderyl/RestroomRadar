var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.4455452, lng: -79.9561952 },
    zoom: 16,
  });
}

//After clicking the button you can click the map which will call the add bathroom with the location
function addMapListener() {
  google.maps.event.addListener(map, 'click', function(event) {
    addBathroom(event.latLng);
  })
}

//Load the form here and add the other information with location to db?
function addBathroom(location) {
  title = "test"


  createMarker(location, title)
}

function createMarker(location, title) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  map.panTo(position);
}

function addInfoWindow(marker, title) {

  var infoWindow = new google.maps.InfoWindow({
      content: title
  });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
  });
}


window.initMap = initMap;