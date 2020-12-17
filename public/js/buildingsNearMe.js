const buildingsNearMe = async (lat, lng) => {
    try {
        window.setTimeout( () => {
            location.assign(`/buildings-near-me/${lat},${lng}/unit/mi`);
        }, 1200);
        alert("Success");  
    } catch(err) {
        alert(err);
    }
};

const buildingsWithin = async (lat, lng, distance) => {
    try {
        window.setTimeout( () => {
            location.assign(`/buildings-within-distance/${distance}/center/${lat},${lng}/unit/mi`);
        }, 1200);
        alert("Success");  
    } catch(err) {
        alert(err);
    }
};

function showPosition(btn) {
    var latitude;
    var longitude;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            latitude = position.coords.latitude;
            longitude =  position.coords.longitude;

            if(btn === 'nearMe') {
                await buildingsNearMe(latitude, longitude);
            }
            if(btn === 'buildingWithin') {
                const slider = document.getElementById('distance-range');
                await buildingsWithin(latitude, longitude, slider.value);
            }
        });
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}

//////// Buildings WithIn Distance ///////
const slider = document.getElementById('distance-range');
const output = document.getElementById('demo');
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
};

