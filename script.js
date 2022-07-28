mapboxgl.accessToken = 'pk.eyJ1IjoidXJiYW4wMSIsImEiOiJjam50MXJoMG4wMXBqM3FwbWViMjN5MW1wIn0.fw5_hMbQv0qyZkLaVJBbFQ';

var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

console.log(orientation);



// Variables to read and store json data with coordinates
// and other config info
const stationsFile = 'metro-stations.json';
let isolines = [10 15 20]; // Iso lines at 10, 15 and 20 minutes
let stations={};
let isochrone = {}; // Object that will all json data and polygons
let polygonArray = [];   // Two dimensional 
                        //array columns are isolines
let srcArray = []; // Array of map source objects
let layArray = []; // Array of map layer objects

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
  for (let j=0; j<isolines.length; j+=) { 
      for (let i=0; i<stations.station.length; i++){
        const coordinates = stations.station[i].coord;
        const query = await 
    fetch(`https://api.mapbox.com/isochrone/v1/mapbox/walking/${coordinates[0]},${coordinates[1]}?contours_minutes=${isolines[j]}&polygons=true&denoise=1&access_token=${mapboxgl.accessToken}`, { method: 'GET'}
        );
        const json = await query.json();
        polygonArray[i,j]=json;
      } // end for i
  } // end for j
  
}

function getCoordinates(index, isoindex){
  return(polygonArray[index,
         isoindex].features[0].geometry.coordinates);
  
}


// The series of promises below make sure all the elements
// have been read before the map is drawn
getJsonDataStations(stationsFile) // Reads JSON file
  .then(() => getIsochrone())
  .then(() => {
    map = new mapboxgl.Map({
      container: 'map-one',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-78.5, -0.2], // starting position
      zoom: 12,
      pitch: 0
    });

    map.addControl(new mapboxgl.FullscreenControl());
    
    map.on('load', () => {

      addMapElements();



 



      addEventListener('orientationchange', event => {
          console.log('orientation changed to:', 
                      orientation);
      });



    }) // end map on load

  }).
  then(() => console.log('Done loading and creating'));



5