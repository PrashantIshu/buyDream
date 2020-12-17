// console.log("Hello from Mapbox");
const locs = JSON.parse(document.getElementById('mapLoc').dataset.locations);



mapboxgl.accessToken = 'pk.eyJ1IjoicHJhc2hhbnRpc2h1IiwiYSI6ImNrZzVoZ3hyMjB1ZGkzMmt6MHF4Ymp5bHMifQ.wpPwL22xzPJhs3PQ9WIn7Q';
 
var mapLoc = new mapboxgl.Map({
    container: 'mapLoc',
    style: 'mapbox://styles/prashantishu/ckhabmlf14yt619mwjlkls9gn',
    scrollZoom: true,
    zoom: 13,
    center: [locs[0], locs[1]],
    interactive: true
});

const bound = new mapboxgl.LngLatBounds();

// Create marker
const els = document.createElement('div');
els.className = 'marker';

//Add Marker
new mapboxgl.Marker({
    element: els,
    anchor: 'bottom'
}).setLngLat([locs[0], locs[1]])
  .addTo(mapLoc);
    
// Extend map bounds to include current location
bound.extend(locs);
