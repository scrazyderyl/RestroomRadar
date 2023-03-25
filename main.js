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
  var params = new URL(document.URL).searchParams;
  var latitude, longitude;

  if (params.get("lat")) {
    latitude = parseFloat(params.get("lat"));
    longitude = parseFloat(params.get("lng"));
    renderMap(latitude, longitude);
  } else {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      renderMap(latitude, longitude);
    });
  }
}

function renderMap(latitude, longitude) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 16,
    styles: mapStyle
  });

  HTTPRequest("POST", "get_marker.php", null, false, loadMarkers);
}

function loadMarkers(markerArray) {
  if (markerArray) {
    for(var i = 0; i < markerArray.length; i++) {
      let marker = markerArray[i];
      let location = new google.maps.LatLng(marker.lat, marker.lng);
  
      let map_marker = new google.maps.Marker({
        id: marker.id,
        position: location,
        title: marker.title,
        map: map
      });
  
      openInfoWindow(map_marker);
      
      google.maps.event.addListener(map_marker, 'click', function() {
        HTTPRequest("POST", "get_review.php", `id=${marker.id}`, false, loadReviews);
      });
    }
  }
}

function createMarker(location, title) {
  new google.maps.Marker({
    position: location,
    content: title,
    map: map
  });

  map.panTo(position);
}

var currentInfoWindow = null;

function openInfoWindow(marker) {
  google.maps.event.addListener(marker, 'click', function () {
    if (currentInfoWindow) {
      currentInfoWindow.close();
    }
    
    currentInfoWindow = new google.maps.InfoWindow({
      content: `<p>${marker.title}</p><a href="http://localhost/form?restroom_id=${marker.id}">Leave a review</a>`
    });

    currentInfoWindow.open(map, marker);
  });
}

const sizeStrings = ["Single Person", "Small", "Medium", "Large"];
const starsStrings = ["", "★", "★★", "★★★", "★★★★", "★★★★★"];

function loadReviews(reviews) {
  if (reviews) {
    reviewHTML = "";

    for(var i = 0; i < reviews.length; i++) {
      var review = reviews[i];
      var hasKey = review.keyed;
      var paid = review.pay;
      var isHandicaped = review.handicapped_accessible;
      var cleanliness = review.cleanliness;
      var scent = review.scent;
      var size = review.size;
      var comment = review.comment;
      
      reviewHTML += `<div class="review">`;
      reviewHTML += `<div class="ratings">`;
      reviewHTML += `<p><b class="criteria">Cleanliness: </b><p class="rating">${starsStrings[cleanliness]}</p>`;
      reviewHTML += `<p><b class="criteria">Scent: </b><p class="rating">${starsStrings[scent]}</p>`;
      reviewHTML += `</div>`;
      reviewHTML += `<p><b>Key Required:</b> ${hasKey ? "Yes" : "No"}</p>`;
      reviewHTML += `<p><b>Purchase Required:</b> ${paid ? "Yes" : "No"}</p>`;
      reviewHTML += `<p><b>Handicap Accessible:</b> ${isHandicaped ? "Yes" : "No"}</p>`;
      reviewHTML += `<p><b>Size:</b> ${sizeStrings[size]}</p>`;
      reviewHTML += `<p class="comment">${comment}</p>`;
      reviewHTML += `</div>`;
    }

    document.getElementById("reviews").innerHTML = reviewHTML;
  }
}

function newLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var currentLat = position.coords.latitude;
      var currentLng = position.coords.longitude;

      window.location.href = `http://localhost/form?lat=${currentLat}&lng=${currentLng}`;
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function HTTPRequest(method, path, data, async, callback) {
  var request = new XMLHttpRequest();

  if (callback) {
    request.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          if (this.responseText) {
            callback(JSON.parse(this.responseText));
            } else {
              callback(null);
            }
          } else {
                  if (this.status === 0) {
                      alert("Network Failure");
                  } else {
                      alert("Something went wrong! Status Code: " + this.status);
                  }
              }
          }
      });
  }

  request.open(method, path, async);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send(data);
}

window.initMap = initMap;