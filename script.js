mapboxgl.accessToken = 'pk.eyJ1IjoidXJiYW4wMSIsImEiOiJjam50MXJoMG4wMXBqM3FwbWViMjN5MW1wIn0.fw5_hMbQv0qyZkLaVJBbFQ';

var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

console.log(orientation);



// Variables to read and store json data with coordinates
// and other config info
const stationsFile = 'metro-stations.json';
const isolines = [10,15,20]; // Iso lines at 10, 15 and 20 minutes
const isoOpacities = [0.3, 0.15, 0.1]; // Opacities for each region
let stations={};
let isochrone = {}; // Object that will all json data and polygons
let polygonArray = [];   // Two dimensional 
                        //array columns are isolines also vars
                        //to keep track of show/hide layers
let showHideLayers=[]
for (let i = 0; i < isolines.length; i++) {
  polygonArray[i] = [];
  showHideLayers[i] = true;
}


// Size of stations dots
const stationCircleSize = 5;






// map var for mapbox map creation
let map;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  console.log("mobile device");
}else{
  // false for not mobile device
  console.log("not mobile device");
}



async function getJsonDataStations(fileName){
  // Takes as input a json file containing the information
  // about the stations
  const response = await fetch(fileName);
  const data = await response.json();
  stations = data;
}



async function getIsochrone(){
  // Takes the coordinates obtained after 
  // calling getJsonDataStations and returns all polygons in 
  // an array of objects
  for (let j=0; j<isolines.length; j++) { 
      for (let i=0; i<stations.station.length; i++){
        const coordinates = stations.station[i].coord;
        
        const query = await fetch(`https://api.mapbox.com/isochrone/v1/mapbox/walking/${coordinates[0]},${coordinates[1]}?contours_minutes=${isolines[j]}&polygons=true&denoise=1&access_token=${mapboxgl.accessToken}`, { method: 'GET'}
        );
        let json = await query.json();
        polygonArray[j].push(json);
      } // end for i
  } // end for j
}

function getCoordinates(index, isoindex){
  return(polygonArray[isoindex][index].features[0].geometry.coordinates);
  
}


// The series of promises below make sure all the elements
// have been read before the map is drawn
getJsonDataStations(stationsFile) // Reads JSON file
  .then(() => getIsochrone())
  .then(() => {
    map = new mapboxgl.Map({
      container: 'map-one',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-78.53, -0.25], // starting position
      zoom: 12,
      pitch: 35
    });

    map.addControl(new mapboxgl.FullscreenControl());
    
    map.on('load', () => {

      addMapElements();

     document.getElementById('10min').
        addEventListener('click', () => {
        // Mostrar y ocultar poligonos
        showHideLayers[0]=!showHideLayers[0];
        if (!showHideLayers[0])
            removeLayer(0);
        else
            showLayer(0);
        }); // end event listener 10 min
     document.getElementById('15min').
        addEventListener('click', () => {
        // Mostrar y ocultar poligonos
        showHideLayers[1]=!showHideLayers[1];
        if (!showHideLayers[1])
            removeLayer(1);
        else
            showLayer(1);
        }); // end event listener 10 min
      document.getElementById('20min').
        addEventListener('click', () => {
        // Mostrar y ocultar poligonos
        showHideLayers[2]=!showHideLayers[2];
        if (!showHideLayers[2])
            removeLayer(2);
        else
            showLayer(2);
        }); // end event listener 10 min



      addEventListener('orientationchange', event => {
          console.log('orientation changed to:', 
                      orientation);
      });



    }) // end map on load

  }).
  then(() => console.log('Done loading and creating'));



5