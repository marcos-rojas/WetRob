//MAP CONFIGURATION
const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var mymap = L.map('mapid').setView([-13.220078691685096, -75.09123104078283], 13);
L.tileLayer(tilesProvider, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
//ICONO
var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});
var greenIcon = new LeafIcon({iconUrl: 'leaf-green.png'});
L.marker([-13.220078691685096, -75.09123104078283], {icon: greenIcon}).bindPopup("Punto de partida de robot.").addTo(mymap);

// TRAYECTORIA
L.polygon([
    [-13.220078691685096, -75.09123104078283],
    [-13.210078691685096, -75.10123104078283],
    [-13.200078691685096, -75.12523104078283],
    [-13.209078691685096, -75.07123104078283],
    [-13.220078691685096, -75.05123104078283],
    [-13.239078691685096, -75.07723104078283],
]).addTo(mymap).bindPopup("Ruta asignada.");
// INPUTS TO MAP HAND

var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("Selecciona registrar si deseas sensar: " + e.latlng.toString())
			.openOn(mymap);
	}

	mymap.on('click', onMapClick);


//INPUTS TO MAP FORM
var entry = document.getElementById("entry");
entry.addEventListener("click",displayDetails);

var row=1;

function displayDetails(){
   var name = document.getElementById("name").value;
   var age = document.getElementById("age").value;
   var grade = document.getElementById("grade").value;
   if(!name || !age || !grade){
        alert("Please fill all the boxes");
        return;
   }
  
   var display = document.getElementById("display");
   var newRow = display.insertRow(row);
   
   var cell1 = newRow.insertCell(0);
   var cell2 = newRow.insertCell(1);
   var cell3 = newRow.insertCell(2);
   
   cell1.innerHTML = name;
   cell2.innerHTML = age;
   cell3.innerHTML = grade;

   row++;

}