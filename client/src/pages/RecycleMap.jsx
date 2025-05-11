import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { recycleCentersDE } from '../utils/recycleCentersDE';
import { greenIcon, yellowIcon } from '../utils/mapIcons';
import 'leaflet/dist/leaflet.css';

// Distance calculation function (Haversine)
function getDistanceFromLatLng(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 📍 Button to zoom to nearest center
function ZoomToNearestButton({ target }) {
  const map = useMap();

  const handleClick = () => {
    if (target) {
      map.setView([target.lat, target.lng], 13);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-4 right-4 z-[999] bg-white text-green-700 px-4 py-2 rounded shadow hover:bg-green-100"
    >
      📍 Zoom to Nearest Center
    </button>
  );
}

export default function RecycleMap() {
  const [userLocation, setUserLocation] = useState(null);
  const [visibleCenters, setVisibleCenters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nearestCenter, setNearestCenter] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);

        const filtered = recycleCentersDE
          .map((center) => {
            const distance = getDistanceFromLatLng(
              coords[0],
              coords[1],
              center.lat,
              center.lng
            );
            return { ...center, distance };
          })
          .filter((c) => c.distance <= 300)
          .sort((a, b) => a.distance - b.distance);

        setVisibleCenters(filtered);
        setNearestCenter(filtered[0]);
      },
      (err) => {
        console.error('Location error:', err);
        const fallback = [52.52, 13.405];
        setUserLocation(fallback);

        const fallbackFiltered = recycleCentersDE
          .map((center) => {
            const distance = getDistanceFromLatLng(
              fallback[0],
              fallback[1],
              center.lat,
              center.lng
            );
            return { ...center, distance };
          })
          .filter((c) => c.distance <= 300)
          .sort((a, b) => a.distance - b.distance);

        setVisibleCenters(fallbackFiltered);
        setNearestCenter(fallbackFiltered[0]);
      }
    );
  }, []);

  const filteredCenters = visibleCenters.filter((center) =>
    center.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const top3 = filteredCenters.slice(0, 3);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* 🗺️ Map */}
      <div className="relative flex-1 h-1/2 lg:h-full">
        <MapContainer
          center={userLocation || [52.52, 13.405]}
          zoom={13}
          scrollWheelZoom
          className="h-full w-full"
          whenReady={(map) => {
            if (userLocation) {
              map.target.setView(userLocation, 13);
            }
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {nearestCenter && <ZoomToNearestButton target={nearestCenter} />}

          {userLocation && (
            <Marker position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
          )}

          {filteredCenters.map((center, i) => {
            const { lat, lng, name, distance } = center;
            const icon = distance <= 100 ? greenIcon : yellowIcon;

            return (
              <Marker key={i} position={[lat, lng]} icon={icon}>
                <Popup>
                  <strong>{name}</strong>
                  <br />
                  {distance.toFixed(1)} km away
                  <br />
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'white' }}
                    className="inline-block mt-2 px-3 py-1 bg-green-600 rounded text-xs hover:bg-green-700"
                  >
                    Get Directions
                  </a>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* 📋 Sidebar */}
      <div className="bg-white shadow-lg p-6 lg:w-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-green-700">Nearest Recycling Centers</h2>

        <input
          type="text"
          placeholder="Search by city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {top3.length === 0 && (
          <p className="text-gray-500">No nearby centers found.</p>
        )}

        <ul className="space-y-4">
          {top3.map((c, i) => (
            <li key={i} className="border-b pb-2">
              <h3 className="font-semibold text-gray-800">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.distance.toFixed(1)} km away</p>
              <p className="text-sm text-gray-500">{c.city}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
