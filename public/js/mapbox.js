// console.log("Hello from Mapbox");
const loc = JSON.parse(document.getElementById('map').dataset.locations);



mapboxgl.accessToken = 'pk.eyJ1IjoicHJhc2hhbnRpc2h1IiwiYSI6ImNrZzVoZ3hyMjB1ZGkzMmt6MHF4Ymp5bHMifQ.wpPwL22xzPJhs3PQ9WIn7Q';
 
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/prashantishu/ckhabmlf14yt619mwjlkls9gn',
    scrollZoom: true,
    zoom: 16,
    center: [loc[0], loc[1]],
    interactive: true
});

const bounds = new mapboxgl.LngLatBounds();

// Create marker
const el = document.createElement('div');
el.className = 'marker';

//Add Marker
new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
}).setLngLat([loc[0], loc[1]])
  .addTo(map);
    
// Extend map bounds to include current location
bounds.extend(loc);
