function hideKeys(){
    document.getElementById("key-true").style.display = "none";
    document.getElementById("key-false").style.display = "none";
    document.getElementById("key-question").style.display = "none";
}

function showKeys(){
    document.getElementById("key-true").style.display = "flex";
    document.getElementById("key-false").style.display = "flex";
    document.getElementById("key-question").style.display = "flex";

}

function hidePay(){
    document.getElementById("pay-true").style.display = "none";
    document.getElementById("pay-false").style.display = "none";
    document.getElementById("pay-question").style.display = "none";

}

function showPay(){
    document.getElementById("pay-true").style.display = "flex";
    document.getElementById("pay-false").style.display = "flex";
    document.getElementById("pay-question").style.display = "flex";

}

function hideHandicap(){
    document.getElementById("handicap-true").style.display = "none";
    document.getElementById("handicap-false").style.display = "none";
    document.getElementById("handicap-question").style.display = "none";

}

function showHandicap(){
    document.getElementById("handicap-true").style.display = "flex";
    document.getElementById("handicap-false").style.display = "flex";
    document.getElementById("handicap-question").style.display = "flex";

}

function hideClean(){
    document.getElementById("clean-1").style.display = "none";
    document.getElementById("clean-2").style.display = "none";
    document.getElementById("clean-3").style.display = "none";
    document.getElementById("clean-4").style.display = "none";
    document.getElementById("clean-5").style.display = "none";
    document.getElementById("clean-question").style.display = "none";

}

function showClean(){
    document.getElementById("clean-1").style.display = "flex";
    document.getElementById("clean-2").style.display = "flex";
    document.getElementById("clean-3").style.display = "flex";
    document.getElementById("clean-4").style.display = "flex";
    document.getElementById("clean-5").style.display = "flex";
    document.getElementById("clean-question").style.display = "flex";

}

function hideScent(){
    document.getElementById("scent-1").style.display = "none";
    document.getElementById("scent-2").style.display = "none";
    document.getElementById("scent-3").style.display = "none";
    document.getElementById("scent-4").style.display = "none";
    document.getElementById("scent-5").style.display = "none";
    document.getElementById("scent-question").style.display = "none";

}

function showScent(){
    document.getElementById("scent-1").style.display = "flex";
    document.getElementById("scent-2").style.display = "flex";
    document.getElementById("scent-3").style.display = "flex";
    document.getElementById("scent-4").style.display = "flex";
    document.getElementById("scent-5").style.display = "flex";
    document.getElementById("scent-question").style.display = "flex";

}

function hideSize(){
    document.getElementById("size-single").style.display = "none";
    document.getElementById("size-small").style.display = "none";
    document.getElementById("size-medium").style.display = "none";
    document.getElementById("size-large").style.display = "none";
    document.getElementById("size-question").style.display = "none";

}

function showSize(){
    document.getElementById("size-single").style.display = "flex";
    document.getElementById("size-small").style.display = "flex";
    document.getElementById("size-medium").style.display = "flex";
    document.getElementById("size-large").style.display = "flex";
    document.getElementById("size-question").style.display = "flex";
}

function hideEnterName(){
    document.getElementById("name-question").style.display = "none";
    document.getElementById("enter-name").style.display = "none";
    document.getElementById("submit-button-begin").style.display = "none";
}

function showEnterName(){
    document.getElementById("name-question").style.display = "flex";
    document.getElementById("enter-name").style.display = "flex";
    document.getElementById("submit-button-begin").style.display = "flex";
}

function hideCommentBox(){
    document.getElementById("comment-box").style.display = "none";
    document.getElementById("comment-question").style.display = "none";
    document.getElementById("submit-button-end").style.display = "none";
}

function showCommentBox(){
    document.getElementById("comment-box").style.display = "flex";
    document.getElementById("comment-question").style.display = "flex";
    document.getElementById("submit-button-end").style.display = "flex";
}

function initForm(){
    hideEnterName();
    hideKeys();
    hidePay();
    hideHandicap();
    hideClean();
    hideScent();
    hideSize();
    hideCommentBox();
}

initForm();

final_box = false;
document.getElementById("comment-box").value = "";
document.getElementById("enter-name").value = "";

var params = new URL(document.URL).searchParams;
var restroom_id, latitude, longitude;

choices = {}


if (params.get("restroom_id")) {
    restroom_id = parseInt(params.get("restroom_id"));
    showKeys();
} else if (params.get("lat")) {
    // new marker
    latitude = parseFloat(params.get("lat"));
    longitude = parseFloat(params.get("lng"));
    restroom_id = -1;
    showEnterName();
}


addEventListener("click", (event) => {
    if(event.target.id == "key-true"){
        hideKeys();
        showPay();
        choices["key"] = true;
    } else if(event.target.id == "key-false"){
        hideKeys();
        showPay();
        choices["key"] = false; 
    } else if (event.target.id == "pay-true"){
        hidePay();
        showHandicap();
        choices["pay"] = true; 
    } else if (event.target.id == "pay-false"){
        hidePay();
        showHandicap();
        choices["pay"] = false; 
    } else if (event.target.id == "handicap-true"){
        hideHandicap();
        showSize();
        choices["handicap"] = true; 
    } else if (event.target.id == "handicap-false"){
        hideHandicap();
        showSize();
        choices["handicap"] = false; 
    } else if (event.target.id == "clean-1" || event.target.id == "clean-2" || event.target.id == "clean-3" || event.target.id == "clean-4" || event.target.id == "clean-5"){
        hideClean();
        showScent();
        choices["clean"] = parseInt(event.target.id.slice(-1));
    } else if (event.target.id == "scent-1" || event.target.id == "scent-2" || event.target.id == "scent-3" || event.target.id == "scent-4" || event.target.id == "scent-5"){
        hideScent();
        showCommentBox();
        final_box = true;
        choices["scent"] = parseInt(event.target.id.slice(-1));
    } else if (event.target.id == "size-single"){
        hideSize();
        showClean();
        choices["size"] = 0;
    } else if (event.target.id == "size-small"){
        hideSize();
        showClean();
        choices["size"] = 1;
    } else if (event.target.id == "size-medium"){
        hideSize();
        showClean();
        choices["size"] = 2;
    } else if (event.target.id == "size-large"){
        hideSize();
        showClean();
        choices["size"] = 3;
    } else if (event.target.id == "submit-button-end"){
        choices["comment"] = document.getElementById("comment-box").value;
        submitForm();
    } else if (event.target.id == "submit-button-begin"){
        choices["name"] = document.getElementById("enter-name").value;
        hideEnterName();
        showKeys();
    }
});

function submitForm() {
    var title = choices["name"];
    var key = choices["key"];
    var pay = choices["pay"];
    var handicap_accessible = choices["handicap"];
    var clean = choices["clean"];
    var scent = choices["scent"];
    var size = choices["size"];
    var comment = choices["comment"];
    
    if (restroom_id == -1) {
        HTTPRequest("POST", "../submit_review.php", `restroom_id=${restroom_id}&title=${title}&lat=${latitude}&lng=${longitude}&keyed=${key}&pay=${pay}&handicap_accessible=${handicap_accessible}&cleanliness=${clean}&scent=${scent}&size=${size}&comment=${comment}`, false, redirect);
    } else {
        HTTPRequest("POST", "../submit_review.php", `restroom_id=${restroom_id}&keyed=${key}&pay=${pay}&handicap_accessible=${handicap_accessible}&cleanliness=${clean}&scent=${scent}&size=${size}&comment=${comment}`, false, redirect);
    }
}

function redirect() {
    if (restroom_id == -1) {
        window.location.href = `http://localhost?lat=${latitude}&lng=${longitude}`;
    } else {
        navigator.geolocation.getCurrentPosition(function(position) {
            var currentLat = position.coords.latitude;
            var currentLng = position.coords.longitude;
            window.location.href = `http://localhost?lat=${currentLat}&lng=${currentLng}`;
        });
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