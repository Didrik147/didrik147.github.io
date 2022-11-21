const bodyEl = document.querySelector('body')
const mapEl = document.querySelector('#map')

// Listen for submit
document.querySelector("#zipForm").addEventListener('submit', getLocationInfo);

// Listen for delete

bodyEl.addEventListener('click', deleteLocation);




function getLocationInfo(e) {
    // Get zip value from input
    const zip = document.querySelector('.zip').value;

    // Make request
    fetch(`https://api.zippopotam.us/NO/${zip}`)
        .then(response => {
            if (response.status != 200) {
                showIcon('remove')
                document.querySelector('#output').innerHTML = `
                            <article class="message is-danger">
                                <div class="message-body">
                                    Ugyldig postnummer, prøv igjen
                                </div>   
                            </article>
                        `;

                throw Error(response.statusText)
            } else {
                showIcon("check")
                return response.json()
            }
        })
        .then(data => {
            // Show location info
            let output = '';

            data.places.forEach(place => {
                output += `
                            <article class="message is-primary">
                                <div class="message-header">
                                    <p>Informasjon om lokasjonen</p>
                                    <button class="delete"></button>
                                </div>
                                <div class="message-body">
                                    <ul>
                                        <li>
                                            <strong>By: </strong>${place['place name']}
                                        </li>
                                        <li>
                                            <strong>Fylke: </strong>${place['state']}
                                        </li>
                                        <li>
                                            <strong>Lengdegrad: </strong>${place['longitude']}
                                        </li>
                                        <li>
                                            <strong>Breddegrad: </strong>${place['latitude']}
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        `
                let lat = place['latitude']
                let lon = place['longitude']

                let lonlat = [lon, lat]

                updateMap(lonlat)
            });

            // Insert into output div
            document.querySelector('#output').innerHTML = output;
        })
        .catch(err => console.log(err))

    e.preventDefault();
}

mapboxgl.accessToken = 'pk.eyJ1IjoiZGlkcmlrMTQ3IiwiYSI6ImNsNzNmbG9tazBjeGMzd3IxMW5uemlrc3QifQ.0U_MFd9MjIWBI6l-ORuttQ';

let TrondheimCoord = [10.3951, 63.4305]

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: TrondheimCoord, // starting position
    zoom: 3 // starting zoom
});

const marker = new mapboxgl.Marker()


//createMap(59.8735, 10.8465)


function updateMap(lonlat, z=9){
    marker.remove()
    
    //map.setCenter([lon, lat])
    //map.zoom = 9
    map.flyTo({ center: lonlat, zoom: z});

    // Create a new marker.
    //const marker = new mapboxgl.Marker()
    marker
        .setLngLat(lonlat)
        .addTo(map);
        
    
    // Add zoom and rotation controls to the map.
    //map.addControl(new mapboxgl.NavigationControl());
}


// Show check or remove icon
function showIcon(icon) {
    // Clear icons
    document.querySelector('.icon-remove').style.display = 'none';
    document.querySelector('.icon-check').style.display = 'none';

    // Show correct icon
    document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
}

// Delete location box
function deleteLocation(e) {
    if (e.target.className == 'delete') {
        document.querySelector('.message').remove();
        document.querySelector('.zip').value = ''

        // Suggestion from comments
        document.querySelector('.icon-check').style = 'none'

        updateMap(TrondheimCoord, 3)
        marker.remove()
    }
}