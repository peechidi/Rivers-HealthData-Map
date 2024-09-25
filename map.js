
let currentPage = 0;
const pageSize = 100; 

    // Initialize the map centered on Rivers State
    var map = L.map('map').setView([4.75, 6.83], 8);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    var markers = L.markerClusterGroup();

   // Function to add hospitals to the map
    function addHospitalMarkers(hospitals)  {  
    hospitals.forEach(function(hospital) {
        var marker = L.circleMarker([hospital.LATITUDE, hospital.LONGITUDE], {
            color: hospital.COLOR,
            radius: 8,
            fillOpacity: 0.8
        }).addTo(map);
 // 

        // Add popups to tell the story of each hospital
        marker.bindPopup(
            "<b>" + hospital.NAME + "</b><br>" +
            "Challenge: " + hospital.CHALLENGES + "<br>" +
            "Beds: " + hospital.BED + " | Staff: " + hospital.STAFF + " | Facility-Level: " + hospital.LEVEL
        );
        // Bind the click event to update the sidebar
        marker.on('click', function() {
            updateSidebar(hospital);
        });

        markers.addLayer(marker); // Add marker to the cluster group
    });
    map.addLayer(markers); // Add cluster group to the map
        
    // });
}

 // Fetch the data from final.json
 function loadPage(page) {
    fetch('final.json')
        .then(response => response.json())
        .then(data => {
            const hospitals = data.hospitals.slice(page * pageSize, (page + 1) * pageSize);
            addHospitalMarkers(hospitals);
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}

// Initial load
loadPage(currentPage);

// Optional: Load more when the map is panned
map.on('moveend', function() {
    currentPage++;
    loadPage(currentPage);
});



//  fetch('final_json.json')
//  .then(response => {
//      if (!response.ok) {
//          throw new Error('Network response was not ok');
//      }
//      return response.json();
//  })
//  .then(data => {
//      addHospitalMarkers(data.hospitals); // Call the function to add markers
//  })
//  .catch(error => {
//      console.error('Error loading data:', error);
//  });
    // Add underserved areas (areas far from hospitals)
// var underservedArea = L.circle([5.15, 6.5], {
//     color: 'blue',
//     fillColor: '#f03',
//     fillOpacity: 0.2,
//     radius: 20000 // 20km area
// }).addTo(map);

// underservedArea.bindPopup("Underserved area: No hospitals within 20km.");

// Function to update the sidebar with hospital info
function updateSidebar(hospital) {
        document.getElementById('description').innerHTML = 
            "<b>" + hospital.NAME + "</b><br>" +
            "Challenge: " + hospital.CHALLENGES + "<br>" +
            "Beds: " + hospital.BED + " | Staff: " + hospital.STAFF + " | Facility-Level: " + hospital.LEVEL;
    }
    
