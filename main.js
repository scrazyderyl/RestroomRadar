var map;

//Remove point of interest on the map
var mapStyle = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.4455452, lng: -79.9561952 },
    zoom: 16,
    styles: mapStyle
  });
}

//After clicking the button you can click the map which will call the add bathroom with the location
function grabCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var currentLat = position.coords.latitude;
      var currentLng = position.coords.longitude;

      // Add a marker to the map at the current location coordinates
      addBathroom({ lat: currentLat, lng: currentLng })
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

//Load the form here and add the other information with location to db?
function addBathroom(location) {
  title = "test"


  createMarker(location, title)
}

function createMarker(location, title) {
  var marker = new google.maps.Marker({
    position: location,
    content:title,
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