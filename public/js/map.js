let map;
let currentLayer = null;
let markers = new Map();
let measurePoints = [];

// Initialize map
function initMap() {
    map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            map.setView([position.coords.latitude, position.coords.longitude], 13);
        });
    }
}

// Layer management
async function loadLayers() {
    const response = await fetch('/api/layers');
    const layers = await response.json();
    const select = document.getElementById('layer-select');
    select.innerHTML = '<option value="">Select Layer</option>';
    layers.forEach(layer => {
        const option = document.createElement('option');
        option.value = layer._id;
        option.textContent = layer.name;
        select.appendChild(option);
    });
}

// Marker management
async function addMarker(e) {
    if (!currentLayer) return alert('Please select a layer first');
    
    const label = document.getElementById('marker-label').value || 'Unnamed';
    const marker = L.marker(e.latlng).addTo(map);
    marker.bindPopup(label);

    const response = await fetch('/api/markers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            layerId: currentLayer,
            label,
            latitude: e.latlng.lat,
            longitude: e.latlng.lng
        })
    });

    const data = await response.json();
    markers.set(data._id, marker);
}

// Distance measurement
function measureDistance() {
    if (measurePoints.length === 2) {
        const distance = map.distance(
            measurePoints[0].getLatLng(),
            measurePoints[1].getLatLng()
        );
        alert(`Distance: ${(distance / 1000).toFixed(2)} km`);
        measurePoints = [];
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadLayers();

    document.getElementById('add-layer').addEventListener('click', async () => {
        const name = document.getElementById('layer-name').value;
        if (!name) return alert('Please enter a layer name');

        await fetch('/api/layers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        loadLayers();
    });

    document.getElementById('layer-select').addEventListener('change', (e) => {
        currentLayer = e.target.value;
    });

    map.on('click', addMarker);

    document.getElementById('measure-distance').addEventListener('click', () => {
        map.on('click', (e) => {
            const marker = L.marker(e.latlng).addTo(map);
            measurePoints.push(marker);
            if (measurePoints.length === 2) {
                measureDistance();
            }
        });
    });
}); 